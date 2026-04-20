import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { type, job, providerName, providerEmail, customerEmail, customerName, providerLanguage } = await request.json();

    if (type === 'provider_accepted') {
      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: customerEmail,
        subject: `✅ Someone wants to help with "${job.title}"!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">NecesitoYa</h1>
              <p style="color: #FF6B35; margin: 8px 0 0; font-weight: bold;">America's Bilingual Local Services App</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e; margin-bottom: 8px;">Great news, ${customerName}! 🎉</h2>
              <p style="color: #4b5563;">A provider wants to help with your job:</p>
              <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 16px;">${job.title}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">${job.category} · ${job.city}</div>
                <div style="color: #16a34a; font-weight: 700; margin-top: 8px;">$${job.budget}</div>
              </div>
              <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-size: 13px; color: #6b7280; margin-bottom: 4px;">Provider / Proveedor</div>
                <div style="font-weight: 600; color: #1a1a2e;">${providerName}</div>
                <div style="color: #6b7280; font-size: 14px;">${providerEmail}</div>
              </div>
              <a href="https://necesitoya.app/messages?job=${job.id}&provider=${encodeURIComponent(providerEmail || '')}"
                style="display: block; background: linear-gradient(135deg, #FF6B35, #F4A261); color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 24px 0;">
                View Messages / Ver Mensajes →
              </a>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                NecesitoYa · America's Bilingual Local Services App<br>
                No platform fees for customers · Sin cargos para clientes
              </p>
            </div>
          </div>
        `,
      });
    }

    if (type === 'job_posted') {
      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: providerEmail,
        subject: `🔔 New job in your area: "${job.title}"`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">NecesitoYa</h1>
              <p style="color: #FF6B35; margin: 8px 0 0; font-weight: bold;">New Job Alert / Nueva Oportunidad</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e; margin-bottom: 8px;">Hi ${providerName}! There's a new job for you 👋</h2>
              <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 16px;">${job.title}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">${job.category} · ${job.city}</div>
                <div style="color: #4b5563; font-size: 14px; margin-top: 8px;">${job.description}</div>
                <div style="color: #16a34a; font-weight: 700; margin-top: 8px; font-size: 18px;">$${job.budget}</div>
              </div>
              <a href="https://necesitoya.app/jobs"
                style="display: block; background: linear-gradient(135deg, #FF6B35, #F4A261); color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 24px 0;">
                View & Accept Job / Ver y Aceptar →
              </a>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                NecesitoYa · America's Bilingual Local Services App<br>
                You're receiving this because you're a registered provider.
              </p>
            </div>
          </div>
        `,
      });
    }

    if (type === 'listing_posted') {
      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: customerEmail,
        subject: `🏷️ Your listing is live: "${job.title}"`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">NecesitoYa</h1>
              <p style="color: #FF6B35; margin: 8px 0 0; font-weight: bold;">Buy & Sell</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e; margin-bottom: 8px;">Your listing is live! 🎉</h2>
              <p style="color: #4b5563;">Hi ${customerName}, your item is now listed on NecesitoYa Buy & Sell.</p>
              <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 16px;">${job.title}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">📍 ${job.city}</div>
                <div style="color: #16a34a; font-weight: 700; margin-top: 8px; font-size: 18px;">${job.budget}</div>
              </div>
              <p style="color: #4b5563; font-size: 14px;">When someone is interested we will notify you by email with their contact information.</p>
              <p style="color: #4b5563; font-size: 14px;">Cuando alguien esté interesado te notificaremos por correo con su información de contacto.</p>
              <a href="https://necesitoya.app/buy-sell"
                style="display: block; background: linear-gradient(135deg, #FF6B35, #F4A261); color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 24px 0;">
                View Your Listing / Ver Anuncio →
              </a>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                NecesitoYa · America's Bilingual Local Services App<br>
                Free to list · Gratis publicar
              </p>
            </div>
          </div>
        `,
      });
    }

    if (type === 'buyer_interested') {
      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: customerEmail,
        subject: `👀 Someone is interested in "${job.title}"!`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">NecesitoYa</h1>
              <p style="color: #FF6B35; margin: 8px 0 0; font-weight: bold;">Buy & Sell</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e; margin-bottom: 8px;">Someone wants your item! 🎉</h2>
              <p style="color: #4b5563;">Hi ${customerName}, a buyer is interested in your listing:</p>
              <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 16px;">${job.title}</div>
                <div style="color: #16a34a; font-weight: 700; margin-top: 8px;">${job.budget}</div>
              </div>
              <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-size: 13px; color: #6b7280; margin-bottom: 4px;">Interested Buyer / Comprador Interesado</div>
                <div style="font-weight: 600; color: #1a1a2e;">${providerEmail}</div>
              </div>
              <p style="color: #4b5563; font-size: 14px;">Contact them directly to arrange the sale.</p>
              <p style="color: #4b5563; font-size: 14px;">Contáctalos directamente para coordinar la venta.</p>
              <a href="https://necesitoya.app/buy-sell"
                style="display: block; background: linear-gradient(135deg, #FF6B35, #F4A261); color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 24px 0;">
                View Listing / Ver Anuncio →
              </a>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                NecesitoYa · America's Bilingual Local Services App
              </p>
            </div>
          </div>
        `,
      });
    }

    if (type === 'job_confirmation') {
      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: customerEmail,
        subject: `✅ Your job is live: "${job.title}"`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">NecesitoYa</h1>
              <p style="color: #FF6B35; margin: 8px 0 0; font-weight: bold;">America's Bilingual Local Services App</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e; margin-bottom: 8px;">Your job is live! 🎉</h2>
              <p style="color: #4b5563;">Hi ${customerName}, your job has been posted and providers in your area are being notified.</p>
              <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 16px;">${job.title}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">${job.category} · ${job.city}</div>
                <div style="color: #16a34a; font-weight: 700; margin-top: 8px;">${job.budget || 'Budget flexible'}</div>
              </div>
              <p style="color: #4b5563; font-size: 14px;">You will receive an email when a provider accepts your job.</p>
              <p style="color: #4b5563; font-size: 14px;">Recibirás un correo cuando un proveedor acepte tu trabajo.</p>
              <a href="https://necesitoya.app/jobs"
                style="display: block; background: linear-gradient(135deg, #FF6B35, #F4A261); color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 24px 0;">
                View All Jobs / Ver Trabajos →
              </a>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                NecesitoYa · America's Bilingual Local Services App<br>
                Free to post · Gratis publicar
              </p>
            </div>
          </div>
        `,
      });
    }

    if (type === 'new_message') {
      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: customerEmail,
        subject: `💬 New message about "${job.title}"`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">NecesitoYa</h1>
              <p style="color: #FF6B35; margin: 8px 0 0; font-weight: bold;">America's Bilingual Local Services App</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e; margin-bottom: 8px;">You have a new message! 💬</h2>
              <p style="color: #4b5563;">Hi ${customerName}, ${providerName} sent you a message about your job:</p>
              <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 16px;">${job.title}</div>
                <div style="color: #6b7280; font-size: 14px; margin-top: 4px;">${job.category} · ${job.city}</div>
              </div>
              <div style="background: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0; border-left: 4px solid #FF6B35;">
                <div style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">Message from ${providerName}:</div>
                <div style="font-size: 15px; color: #1a1a2e;">${job.message}</div>
              </div>
              <a href="https://necesitoya.app/messages?job=${job.id}&provider=${encodeURIComponent(providerEmail || '')}"
                style="display: block; background: linear-gradient(135deg, #FF6B35, #F4A261); color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 24px 0;">
                Reply to Message / Responder →
              </a>
              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                NecesitoYa · America's Bilingual Local Services App<br>
                No platform fees for customers · Sin cargos para clientes
              </p>
            </div>
          </div>
        `,
      });
    }

    if (type === 'stripe_reminder') {
      const isSpanish = providerLanguage === 'es';
      const subject = isSpanish
        ? `⚠️ ${providerName}, completa tu configuración para empezar a ganar`
        : `⚠️ ${providerName}, finish your setup to start earning`;

      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: providerEmail,
        subject: subject,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1a1a2e, #0f3460); padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">NecesitoYa</h1>
              <p style="color: #FF6B35; margin: 8px 0 0; font-weight: bold;">You're almost ready / Casi listo</p>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e; margin-bottom: 8px;">Hi ${providerName}! 👋</h2>
              <p style="color: #4b5563; font-size: 15px;">You signed up as a provider on NecesitoYa yesterday — thank you! But your account isn't ready to accept paid jobs yet.</p>
              <p style="color: #4b5563; font-size: 15px;">Te registraste como proveedor en NecesitoYa ayer — ¡gracias! Pero tu cuenta aún no está lista para aceptar trabajos pagados.</p>

              <div style="background: #fef3c7; border: 2px solid #f59e0b; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 700; color: #92400e; margin-bottom: 4px; font-size: 16px;">⚠️ One step left: Connect your bank</div>
                <div style="color: #92400e; font-size: 14px; margin-bottom: 8px;">Without a connected bank account, you cannot accept paid jobs on NecesitoYa.</div>
                <div style="font-weight: 700; color: #92400e; margin-bottom: 4px; font-size: 16px;">⚠️ Un paso más: Conecta tu banco</div>
                <div style="color: #92400e; font-size: 14px;">Sin una cuenta bancaria conectada, no puedes aceptar trabajos pagados en NecesitoYa.</div>
              </div>

              <div style="background: #f0f9ff; border-radius: 8px; padding: 16px; margin: 20px 0;">
                <div style="font-weight: 600; color: #1a1a2e; font-size: 15px; margin-bottom: 10px;">Why it's worth 3 minutes:</div>
                <div style="color: #4b5563; font-size: 14px; line-height: 1.8;">
                  ✓ Bank-grade security via Stripe<br>
                  ✓ Get paid directly after every completed job<br>
                  ✓ Keep 92% of every payment — we only take 8%<br>
                  ✓ Get notified the moment a customer needs you
                </div>
              </div>

              <a href="https://necesitoya.app/provider-dashboard"
                style="display: block; background: linear-gradient(135deg, #FF6B35, #F4A261); color: white; text-align: center; padding: 16px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; margin: 24px 0;">
                Complete Setup Now / Completar Configuración →
              </a>

              <p style="color: #6b7280; font-size: 13px; text-align: center; margin-top: 20px;">
                Takes 3 minutes · Secure · Paid directly to your bank<br>
                Toma 3 minutos · Seguro · Pago directo a tu banco
              </p>

              <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 24px;">
                NecesitoYa · America's Bilingual Local Services App<br>
                Need help? Reply to this email and we'll walk you through it.<br>
                ¿Necesitas ayuda? Responde a este correo y te ayudamos.
              </p>
            </div>
          </div>
        `,
      });
    }

    if (type === 'job_reported') {
      await resend.emails.send({
        from: 'NecesitoYa <hello@necesitoya.app>',
        to: 'hello@necesitoya.app',
        subject: `🚩 Job Reported: "${job.title}"`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: #ef4444; padding: 32px; border-radius: 12px 12px 0 0; text-align: center;">
              <h1 style="color: white; font-size: 28px; margin: 0;">🚩 Content Report</h1>
            </div>
            <div style="background: white; padding: 32px; border-radius: 0 0 12px 12px; border: 1px solid #e5e7eb;">
              <h2 style="color: #1a1a2e;">A job has been reported</h2>
              <p style="color: #4b5563;">${job.message}</p>
              <p style="color: #4b5563;">Please review and take action within 24 hours.</p>
              <a href="https://necesitoya.app/admin" style="display: block; background: #1a1a2e; color: white; text-align: center; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 24px 0;">
                Go to Admin →
              </a>
            </div>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}