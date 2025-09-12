import { NextRequest, NextResponse } from 'next/server';
import { contactFormSchema, sanitizeInput, checkRateLimit, logSecurityEvent } from '@/lib/security';
import { z } from 'zod';

// CORS configuration
const corsHeaders = {
  'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_APP_URL || 'https://wugamers.ru',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting and logging
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    // Rate limiting check
    if (!checkRateLimit(`contact:${ip}`, 5, 15 * 60 * 1000)) { // 5 requests per 15 minutes
      logSecurityEvent({
        type: 'rate_limit',
        ip,
        details: { endpoint: '/api/contact' }
      });
      
      return NextResponse.json(
        { error: 'Слишком много запросов. Попробуйте позже.' },
        { status: 429, headers: corsHeaders }
      );
    }
    
    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Неверный формат данных' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Validate input with Zod schema
    let validatedData;
    try {
      validatedData = contactFormSchema.parse(body);
    } catch (error) {
      if (error instanceof z.ZodError) {
        logSecurityEvent({
          type: 'validation_error',
          ip,
          details: { errors: error.errors }
        });
        
        return NextResponse.json(
          { 
            error: 'Ошибка валидации',
            details: error.errors.map(e => ({
              field: e.path.join('.'),
              message: e.message
            }))
          },
          { status: 400, headers: corsHeaders }
        );
      }
      throw error;
    }
    
    // Additional sanitization
    const sanitizedData = {
      name: sanitizeInput(validatedData.name),
      email: validatedData.email.toLowerCase().trim(),
      phone: validatedData.phone ? sanitizeInput(validatedData.phone) : undefined,
      subject: validatedData.subject,
      message: sanitizeInput(validatedData.message),
    };
    
    // Check for suspicious patterns (potential XSS/injection)
    const suspiciousPatterns = [
      /<script/i,
      /javascript:/i,
      /on\w+=/i,
      /SELECT.*FROM/i,
      /DROP\s+TABLE/i,
      /INSERT\s+INTO/i,
      /UPDATE.*SET/i,
      /DELETE\s+FROM/i,
      /--/,
      /\/\*/,
      /\*\//,
      /xp_/,
      /sp_/,
      /0x/,
      /UNION/i,
      /EXEC/i,
    ];
    
    const allText = Object.values(sanitizedData).join(' ');
    if (suspiciousPatterns.some(pattern => pattern.test(allText))) {
      logSecurityEvent({
        type: 'validation_error',
        ip,
        details: { 
          reason: 'Suspicious content detected',
          data: sanitizedData
        }
      });
      
      return NextResponse.json(
        { error: 'Обнаружено подозрительное содержимое' },
        { status: 400, headers: corsHeaders }
      );
    }
    
    // Log successful submission
    logSecurityEvent({
      type: 'form_submission',
      ip,
      details: { 
        form: 'contact',
        email: sanitizedData.email
      }
    });
    
    // In production, here you would:
    // 1. Store in database with prepared statements
    // 2. Send email notification
    // 3. Add to CRM
    // 4. Send confirmation email to user
    
    // For now, simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return success response
    return NextResponse.json(
      { 
        success: true,
        message: 'Ваше сообщение успешно отправлено. Мы свяжемся с вами в ближайшее время.',
        reference: `WUG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      },
      { 
        status: 200, 
        headers: {
          ...corsHeaders,
          'Cache-Control': 'no-store, no-cache, must-revalidate, private',
        }
      }
    );
    
  } catch (error) {
    // Log unexpected errors
    console.error('Contact form error:', error);
    
    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Произошла ошибка при обработке запроса' },
      { status: 500, headers: corsHeaders }
    );
  }
}

// Disable body parsing for this route to handle it manually
export const runtime = 'edge'; // Use edge runtime for better security and performance