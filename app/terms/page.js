'use client'

export default function TermsOfService() {
  return (
    <main style={{ fontFamily: 'Arial, sans-serif', margin: 0, padding: 0, backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <nav style={{ background: '#1a1a2e', padding: '16px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <a href="/" style={{ color: '#FF6B35', fontSize: '24px', fontWeight: 'bold', textDecoration: 'none' }}>⚡ NecesitoYa</a>
        <a href="/" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '14px', textDecoration: 'none' }}>← Back to Home</a>
      </nav>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '48px 24px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' }}>Terms of Service</h1>
        <p style={{ color: '#FF6B35', fontWeight: '600', marginBottom: '8px' }}>Términos de Servicio</p>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '40px' }}>Last updated: April 18, 2026</p>

        {/* Intro */}
        <div style={{ backgroundColor: '#fff8f5', border: '1px solid #FF6B35', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <p style={{ color: '#1a1a2e', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
            Welcome to NecesitoYa. By accessing or using our platform — including our website at necesitoya.app and our mobile applications — you agree to be bound by these Terms of Service. Please read them carefully before using NecesitoYa.
          </p>
        </div>

        {section("1. About NecesitoYa", [
          `NecesitoYa ("we," "us," or "our") is an online marketplace platform operated by 32&8 LLC that connects independent service providers ("Providers") with customers seeking local services ("Customers"). NecesitoYa is headquartered in Haines City, Florida.`,
          `NecesitoYa is a technology platform only. We do not provide services directly, employ Providers, or act as an employer, staffing agency, or contractor. All services are performed by independent third-party Providers who are solely responsible for the quality, safety, and legality of the services they offer.`
        ])}

        {section("2. Marketplace Platform — Not an Employer", [
          `IMPORTANT: NecesitoYa is a marketplace platform that facilitates connections between Customers and Providers. We are NOT a service provider, employer, or contractor.`,
          `Providers using NecesitoYa are independent contractors, not employees, agents, or representatives of NecesitoYa or 32&8 LLC. NecesitoYa does not supervise, direct, control, or monitor Providers' work.`,
          `NecesitoYa does not verify, endorse, or guarantee any Provider's identity, qualifications, licenses, certifications, insurance, or background. Customers are solely responsible for evaluating Providers before engaging their services.`,
          `By using NecesitoYa, you acknowledge and agree that any interaction, transaction, or dispute between Customers and Providers is solely between those parties and does not involve NecesitoYa.`
        ])}

        {section("3. Eligibility", [
          `You must be at least 18 years old to use NecesitoYa.`,
          `By using our platform, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms.`,
          `NecesitoYa is available to users in the United States. Use of the platform outside the United States is at your own risk.`
        ])}

        {section("4. User Accounts & Registration", [
          `You may use certain features of NecesitoYa without creating an account. To post jobs, accept jobs, or process payments, you must provide a valid email address.`,
          `You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.`,
          `You agree to provide accurate, current, and complete information when using NecesitoYa. NecesitoYa reserves the right to suspend or terminate accounts that contain false or misleading information.`
        ])}

        {section("5. Safety & User Responsibility", [
          `YOUR SAFETY IS YOUR RESPONSIBILITY. NecesitoYa strongly encourages all users to take precautions when meeting strangers, including meeting in public places when possible, informing a trusted person of your plans, and trusting your instincts.`,
          `NecesitoYa does not conduct criminal background checks, verify identities, or screen Providers or Customers. You use NecesitoYa at your own risk.`,
          `NecesitoYa is not responsible for the conduct of any user on or off the platform. You agree to release NecesitoYa, 32&8 LLC, and their officers, directors, employees, and agents from any claims, damages, or losses arising from interactions with other users.`,
          `BABYSITTING AND CHILDCARE SERVICES: Customers hiring babysitters or childcare providers through NecesitoYa assume full responsibility for vetting such Providers, including conducting their own background checks, verifying references, and supervising the care of their children. NecesitoYa does not perform any background checks on Providers in any category. Childcare services carry inherent risks, and Customers are strongly encouraged to meet Providers in person before entrusting them with children.`,
          `If you experience an emergency, contact local law enforcement (911) immediately. NecesitoYa does not provide emergency services.`
        ])}

        {section("6. Provider Obligations", [
          `If you use NecesitoYa as a Provider, you acknowledge and agree that you are an independent contractor and are solely responsible for:`,
          `• Obtaining and maintaining all licenses, permits, certifications, and insurance required by law for the services you offer`,
          `• Complying with all applicable federal, state, and local laws, including tax laws, employment laws, and safety regulations`,
          `• Paying all applicable taxes on income earned through the platform, including self-employment taxes. NecesitoYa does not withhold taxes on your behalf and will issue 1099 forms where required by law`,
          `• Providing services with reasonable skill, care, and in a safe and professional manner`,
          `• Resolving any disputes, complaints, or claims from Customers related to your services`,
          `• Maintaining your own tools, equipment, vehicle, and supplies necessary to perform services`,
          `• Controlling the manner, method, and means by which you perform services`,
          `You acknowledge that NecesitoYa does not provide workers' compensation, health insurance, unemployment insurance, or any other employee benefits to Providers. You are not entitled to any employee benefits from NecesitoYa or 32&8 LLC.`
        ])}

        {section("7. Prohibited Conduct", [
          `You agree NOT to use NecesitoYa to:`,
          `• Post false, misleading, or fraudulent job listings or service offerings`,
          `• Harass, threaten, or harm other users`,
          `• Engage in illegal activities or solicit others to do so`,
          `• Discriminate against users based on race, color, religion, sex, national origin, disability, or any protected characteristic`,
          `• Circumvent the NecesitoYa payment system to avoid platform fees`,
          `• Post adult content, illegal services, weapons, or controlled substances`,
          `• Use the platform to spam or send unsolicited communications`,
          `• Impersonate any person or entity`,
          `Violation of these rules may result in immediate account termination and legal action where applicable.`
        ])}

        {section("8. Payments & Fees", [
          `NecesitoYa uses Stripe, a third-party payment processor, to handle all payments. By using NecesitoYa's payment features, you also agree to Stripe's Terms of Service.`,
          `Customers pay Providers directly through the NecesitoYa platform. NecesitoYa charges Providers a service fee of 8% on each completed transaction. Customers pay no platform fees.`,
          `All payments are final unless a dispute is resolved in the Customer's favor through NecesitoYa's dispute process. NecesitoYa reserves the right to refund payments at its sole discretion.`,
          `NecesitoYa is not responsible for any payment disputes between Customers and Providers. We will make reasonable efforts to assist in dispute resolution but make no guarantees of outcomes.`
        ])}

        {section("9. Electronic Communications Consent", [
          `By creating an account or using NecesitoYa, you consent to receive electronic communications from us, including emails, push notifications, and in-app messages related to your account, transactions, job activity, and platform updates.`,
          `You may opt out of non-essential communications by adjusting your notification settings or contacting us at hello@necesitoya.app. Certain transactional communications (such as payment confirmations, security alerts, and legal notices) cannot be opted out of while you maintain an account.`,
          `You agree that all legal notices, disclosures, and other communications we provide electronically satisfy any legal requirement that such communications be in writing.`
        ])}

        {section("10. Limitation of Liability", [
          `TO THE MAXIMUM EXTENT PERMITTED BY LAW, NECESITOYA AND 32&8 LLC SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE PLATFORM.`,
          `NecesitoYa's total liability to you for any claims arising from your use of the platform shall not exceed the amount of fees paid by you to NecesitoYa in the six (6) months preceding the claim, or one hundred dollars ($100), whichever is greater.`,
          `NecesitoYa is not liable for any damages arising from: (a) interactions between Customers and Providers; (b) property damage or personal injury caused by Providers or Customers; (c) the quality or safety of services performed; (d) unauthorized access to your account; or (e) any third-party conduct.`
        ])}

        {section("11. Disclaimer of Warranties", [
          `NECESITOYA IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED.`,
          `NecesitoYa does not warrant that: (a) the platform will be uninterrupted or error-free; (b) any Provider is qualified, licensed, or insured; (c) services will meet your expectations; or (d) any information on the platform is accurate or complete.`
        ])}

        {section("12. Dispute Resolution", [
          `Any dispute between a Customer and a Provider must first be addressed directly between those parties. NecesitoYa may, at its sole discretion, assist in dispute resolution but is not obligated to do so.`,
          `Any legal disputes between you and NecesitoYa shall be resolved through binding arbitration in Polk County, Florida, under the rules of the American Arbitration Association. You waive your right to a jury trial.`,
          `CLASS ACTION WAIVER: You and NecesitoYa agree that any arbitration or legal proceeding shall be conducted only on an individual basis and not in a class, consolidated, or representative action. You waive any right to participate in a class action lawsuit or class-wide arbitration against NecesitoYa.`,
          `These Terms shall be governed by the laws of the State of Florida, without regard to its conflict of law provisions.`
        ])}

        {section("13. Indemnification", [
          `You agree to indemnify, defend, and hold harmless NecesitoYa, 32&8 LLC, and their officers, directors, employees, contractors, and agents from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your use of the platform; (b) your violation of these Terms; (c) your interactions, transactions, or disputes with other users; (d) services you provide or receive through the platform; (e) property damage, personal injury, or any other harm caused by you or resulting from your conduct; or (f) your violation of any applicable law or the rights of any third party.`,
          `This indemnification obligation survives termination of your account or these Terms.`
        ])}

        {section("14. Intellectual Property & DMCA", [
          `All content on NecesitoYa, including logos, text, graphics, and software, is owned by 32&8 LLC and protected by applicable intellectual property laws.`,
          `You may not copy, reproduce, distribute, or create derivative works from NecesitoYa content without our express written permission.`,
          `DMCA NOTICE: If you believe content on NecesitoYa infringes your copyright, please send a written notice to hello@necesitoya.app including: (a) a description of the copyrighted work you claim has been infringed; (b) the location of the allegedly infringing material on our platform; (c) your contact information; (d) a statement that you have a good faith belief the use is not authorized; (e) a statement, under penalty of perjury, that the information is accurate and you are authorized to act on behalf of the copyright owner; and (f) your physical or electronic signature. We will respond to valid DMCA notices in accordance with the Digital Millennium Copyright Act.`
        ])}

        {section("15. Privacy", [
          `Your use of NecesitoYa is also governed by our Privacy Policy, available at necesitoya.app/privacy. By using NecesitoYa, you consent to the collection and use of your information as described in the Privacy Policy.`
        ])}

        {section("16. Changes to Terms", [
          `NecesitoYa reserves the right to modify these Terms at any time. We will notify users of material changes by updating the "Last updated" date at the top of this page.`,
          `Your continued use of NecesitoYa after changes are posted constitutes your acceptance of the modified Terms.`
        ])}

        {section("17. Termination", [
          `NecesitoYa reserves the right to suspend or terminate your access to the platform at any time, with or without notice, for any reason including violation of these Terms.`,
          `You may stop using NecesitoYa at any time. These Terms will survive termination to the extent necessary to enforce rights and obligations.`
        ])}

        {section("18. Contact Us", [
          `If you have questions about these Terms of Service, please contact us:`,
          `NecesitoYa / 32&8 LLC`,
          `Email: hello@necesitoya.app`,
          `Website: necesitoya.app`,
          `Haines City, Florida, United States`
        ])}

        <hr style={{ margin: '48px 0', border: 'none', borderTop: '2px solid #FF6B35' }} />

        <h1 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a2e', marginBottom: '8px' }}>Términos de Servicio</h1>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '40px' }}>Última actualización: 18 de abril de 2026</p>

        <div style={{ backgroundColor: '#fff8f5', border: '1px solid #FF6B35', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
          <p style={{ color: '#1a1a2e', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
            Bienvenido a NecesitoYa. Al acceder o usar nuestra plataforma — incluyendo nuestro sitio web necesitoya.app y nuestras aplicaciones móviles — usted acepta estar sujeto a estos Términos de Servicio. Por favor léalos cuidadosamente antes de usar NecesitoYa.
          </p>
        </div>

        {section("1. Acerca de NecesitoYa", [
          `NecesitoYa ("nosotros") es una plataforma de mercado en línea operada por 32&8 LLC que conecta a proveedores de servicios independientes ("Proveedores") con clientes que buscan servicios locales ("Clientes"). NecesitoYa tiene su sede en Haines City, Florida.`,
          `NecesitoYa es únicamente una plataforma tecnológica. No proporcionamos servicios directamente, no empleamos a Proveedores, ni actuamos como empleador, agencia de empleo, o contratista. Todos los servicios son realizados por Proveedores independientes externos, quienes son los únicos responsables de la calidad, seguridad y legalidad de los servicios que ofrecen.`
        ])}

        {section("2. Plataforma de Mercado — No Empleador", [
          `IMPORTANTE: NecesitoYa es una plataforma de mercado que facilita conexiones entre Clientes y Proveedores. NO somos un proveedor de servicios, empleador, ni contratista.`,
          `Los Proveedores que usan NecesitoYa son contratistas independientes, no empleados, agentes, o representantes de NecesitoYa o 32&8 LLC. NecesitoYa no supervisa, dirige, controla, ni monitorea el trabajo de los Proveedores.`,
          `NecesitoYa no verifica, aprueba, ni garantiza la identidad, calificaciones, licencias, certificaciones, seguros, o antecedentes de ningún Proveedor. Los Clientes son los únicos responsables de evaluar a los Proveedores antes de contratar sus servicios.`,
          `Al usar NecesitoYa, usted reconoce y acepta que cualquier interacción, transacción, o disputa entre Clientes y Proveedores es únicamente entre esas partes y no involucra a NecesitoYa.`
        ])}

        {section("3. Elegibilidad", [
          `Debe tener al menos 18 años para usar NecesitoYa.`,
          `Al usar nuestra plataforma, usted declara y garantiza que tiene al menos 18 años y la capacidad legal para aceptar estos Términos.`,
          `NecesitoYa está disponible para usuarios en Estados Unidos. El uso de la plataforma fuera de Estados Unidos es bajo su propio riesgo.`
        ])}

        {section("4. Cuentas de Usuario y Registro", [
          `Puede usar ciertas funciones de NecesitoYa sin crear una cuenta. Para publicar trabajos, aceptar trabajos, o procesar pagos, debe proporcionar un correo electrónico válido.`,
          `Usted es responsable de mantener la confidencialidad de la información de su cuenta y de todas las actividades que ocurran bajo su cuenta.`,
          `Usted acepta proporcionar información precisa, actualizada, y completa al usar NecesitoYa. NecesitoYa se reserva el derecho de suspender o cancelar cuentas que contengan información falsa o engañosa.`
        ])}

        {section("5. Seguridad y Responsabilidad del Usuario", [
          `SU SEGURIDAD ES SU RESPONSABILIDAD. NecesitoYa recomienda encarecidamente a todos los usuarios tomar precauciones al reunirse con desconocidos, incluyendo reunirse en lugares públicos cuando sea posible, informar a una persona de confianza sobre sus planes, y confiar en sus instintos.`,
          `NecesitoYa no realiza verificaciones de antecedentes penales, no verifica identidades, ni filtra a Proveedores o Clientes. Usa NecesitoYa bajo su propio riesgo.`,
          `NecesitoYa no es responsable de la conducta de ningún usuario dentro o fuera de la plataforma. Usted acepta liberar a NecesitoYa, 32&8 LLC, y sus funcionarios, directores, empleados, y agentes de cualquier reclamo, daño, o pérdida que surja de interacciones con otros usuarios.`,
          `SERVICIOS DE CUIDADO DE NIÑOS: Los Clientes que contraten niñeras o proveedores de cuidado infantil a través de NecesitoYa asumen toda la responsabilidad de evaluar a dichos Proveedores, incluyendo realizar sus propias verificaciones de antecedentes, verificar referencias, y supervisar el cuidado de sus hijos. NecesitoYa no realiza verificaciones de antecedentes en ninguna categoría. Los servicios de cuidado infantil conllevan riesgos inherentes, y se recomienda encarecidamente a los Clientes conocer a los Proveedores en persona antes de confiarles a sus hijos.`,
          `En caso de emergencia, comuníquese inmediatamente con las autoridades locales (911). NecesitoYa no proporciona servicios de emergencia.`
        ])}

        {section("6. Obligaciones del Proveedor", [
          `Si usa NecesitoYa como Proveedor, reconoce y acepta que es un contratista independiente y es el único responsable de:`,
          `• Obtener y mantener todas las licencias, permisos, certificaciones, y seguros requeridos por ley para los servicios que ofrece`,
          `• Cumplir con todas las leyes federales, estatales, y locales aplicables, incluyendo leyes fiscales, laborales, y de seguridad`,
          `• Pagar todos los impuestos aplicables sobre los ingresos obtenidos a través de la plataforma, incluyendo impuestos de trabajo por cuenta propia. NecesitoYa no retiene impuestos y emitirá formularios 1099 donde lo requiera la ley`,
          `• Proporcionar servicios con habilidad razonable, cuidado, y de manera segura y profesional`,
          `• Resolver cualquier disputa, queja, o reclamo de Clientes relacionado con sus servicios`,
          `• Mantener sus propias herramientas, equipo, vehículo, y suministros necesarios para realizar los servicios`,
          `• Controlar la manera, método, y medios por los cuales realiza los servicios`,
          `Usted reconoce que NecesitoYa no proporciona compensación laboral, seguro de salud, seguro de desempleo, o ningún otro beneficio laboral a los Proveedores. No tiene derecho a ningún beneficio laboral de NecesitoYa o 32&8 LLC.`
        ])}

        {section("7. Conducta Prohibida", [
          `Usted acepta NO usar NecesitoYa para:`,
          `• Publicar listados de trabajo u ofertas de servicios falsos, engañosos, o fraudulentos`,
          `• Acosar, amenazar, o dañar a otros usuarios`,
          `• Participar en actividades ilegales o incitar a otros a hacerlo`,
          `• Discriminar a usuarios por raza, color, religión, sexo, origen nacional, discapacidad, o cualquier característica protegida`,
          `• Evadir el sistema de pago de NecesitoYa para evitar tarifas de la plataforma`,
          `• Publicar contenido para adultos, servicios ilegales, armas, o sustancias controladas`,
          `• Usar la plataforma para enviar spam o comunicaciones no solicitadas`,
          `• Hacerse pasar por cualquier persona o entidad`,
          `La violación de estas reglas puede resultar en la cancelación inmediata de la cuenta y acciones legales cuando sea aplicable.`
        ])}

        {section("8. Pagos y Tarifas", [
          `NecesitoYa utiliza Stripe, un procesador de pagos de terceros, para manejar todos los pagos. Al usar las funciones de pago de NecesitoYa, también acepta los Términos de Servicio de Stripe.`,
          `Los Clientes pagan a los Proveedores directamente a través de la plataforma NecesitoYa. NecesitoYa cobra a los Proveedores una tarifa de servicio del 8% en cada transacción completada. Los Clientes no pagan tarifas de plataforma.`,
          `Todos los pagos son finales a menos que una disputa se resuelva a favor del Cliente a través del proceso de disputas de NecesitoYa. NecesitoYa se reserva el derecho de reembolsar pagos a su discreción.`,
          `NecesitoYa no es responsable de ninguna disputa de pago entre Clientes y Proveedores. Haremos esfuerzos razonables para ayudar en la resolución de disputas pero no garantizamos resultados.`
        ])}

        {section("9. Consentimiento para Comunicaciones Electrónicas", [
          `Al crear una cuenta o usar NecesitoYa, usted consiente recibir comunicaciones electrónicas de nosotros, incluyendo correos electrónicos, notificaciones push, y mensajes dentro de la aplicación relacionados con su cuenta, transacciones, actividad de trabajos, y actualizaciones de la plataforma.`,
          `Puede optar por no recibir comunicaciones no esenciales ajustando la configuración de notificaciones o contactándonos en hello@necesitoya.app. Ciertas comunicaciones transaccionales (como confirmaciones de pago, alertas de seguridad, y avisos legales) no pueden ser desactivadas mientras mantenga una cuenta.`,
          `Usted acepta que todos los avisos legales, divulgaciones, y otras comunicaciones que proporcionamos electrónicamente satisfacen cualquier requisito legal de que dichas comunicaciones sean por escrito.`
        ])}

        {section("10. Limitación de Responsabilidad", [
          `HASTA EL MÁXIMO PERMITIDO POR LA LEY, NECESITOYA Y 32&8 LLC NO SERÁN RESPONSABLES DE NINGÚN DAÑO INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENTE, O PUNITIVO QUE SURJA DEL USO DE LA PLATAFORMA.`,
          `La responsabilidad total de NecesitoYa hacia usted por cualquier reclamo que surja del uso de la plataforma no excederá el monto de las tarifas pagadas por usted a NecesitoYa en los seis (6) meses previos al reclamo, o cien dólares ($100), lo que sea mayor.`,
          `NecesitoYa no es responsable de ningún daño que surja de: (a) interacciones entre Clientes y Proveedores; (b) daños a la propiedad o lesiones personales causadas por Proveedores o Clientes; (c) la calidad o seguridad de los servicios realizados; (d) acceso no autorizado a su cuenta; o (e) cualquier conducta de terceros.`
        ])}

        {section("11. Exención de Garantías", [
          `NECESITOYA SE PROPORCIONA "TAL CUAL" Y "SEGÚN DISPONIBILIDAD" SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS.`,
          `NecesitoYa no garantiza que: (a) la plataforma estará libre de interrupciones o errores; (b) cualquier Proveedor esté calificado, licenciado, o asegurado; (c) los servicios cumplirán con sus expectativas; o (d) cualquier información en la plataforma sea precisa o completa.`
        ])}

        {section("12. Resolución de Disputas", [
          `Cualquier disputa entre un Cliente y un Proveedor debe ser abordada primero directamente entre esas partes. NecesitoYa puede, a su discreción, ayudar en la resolución de disputas pero no está obligado a hacerlo.`,
          `Cualquier disputa legal entre usted y NecesitoYa se resolverá mediante arbitraje vinculante en el Condado de Polk, Florida, bajo las reglas de la Asociación Americana de Arbitraje. Usted renuncia a su derecho a un juicio con jurado.`,
          `RENUNCIA A DEMANDAS COLECTIVAS: Usted y NecesitoYa acuerdan que cualquier arbitraje o procedimiento legal se llevará a cabo solo de manera individual y no como demanda colectiva, consolidada, o representativa. Usted renuncia a cualquier derecho de participar en una demanda colectiva o arbitraje colectivo contra NecesitoYa.`,
          `Estos Términos se regirán por las leyes del Estado de Florida, sin tener en cuenta sus disposiciones sobre conflictos de leyes.`
        ])}

        {section("13. Indemnización", [
          `Usted acepta indemnizar, defender, y eximir de responsabilidad a NecesitoYa, 32&8 LLC, y sus funcionarios, directores, empleados, contratistas, y agentes de cualquier reclamo, daño, pérdida, responsabilidad, costo, y gasto (incluyendo honorarios razonables de abogados) que surjan de o estén relacionados con: (a) su uso de la plataforma; (b) su violación de estos Términos; (c) sus interacciones, transacciones, o disputas con otros usuarios; (d) servicios que proporcione o reciba a través de la plataforma; (e) daños a la propiedad, lesiones personales, o cualquier otro daño causado por usted o resultante de su conducta; o (f) su violación de cualquier ley aplicable o los derechos de terceros.`,
          `Esta obligación de indemnización sobrevive a la terminación de su cuenta o estos Términos.`
        ])}

        {section("14. Propiedad Intelectual y DMCA", [
          `Todo el contenido en NecesitoYa, incluyendo logos, texto, gráficos, y software, es propiedad de 32&8 LLC y está protegido por las leyes de propiedad intelectual aplicables.`,
          `No puede copiar, reproducir, distribuir, o crear obras derivadas del contenido de NecesitoYa sin nuestro permiso expreso por escrito.`,
          `AVISO DMCA: Si cree que el contenido en NecesitoYa infringe su derecho de autor, envíe un aviso por escrito a hello@necesitoya.app. Responderemos a los avisos DMCA válidos de acuerdo con la Ley de Derechos de Autor del Milenio Digital.`
        ])}

        {section("15. Privacidad", [
          `Su uso de NecesitoYa también está regido por nuestra Política de Privacidad, disponible en necesitoya.app/privacy. Al usar NecesitoYa, usted consiente la recopilación y uso de su información como se describe en la Política de Privacidad.`
        ])}

        {section("16. Cambios a los Términos", [
          `NecesitoYa se reserva el derecho de modificar estos Términos en cualquier momento. Notificaremos a los usuarios de cambios importantes actualizando la fecha de "Última actualización" en la parte superior de esta página.`,
          `Su uso continuo de NecesitoYa después de que se publiquen los cambios constituye su aceptación de los Términos modificados.`
        ])}

        {section("17. Terminación", [
          `NecesitoYa se reserva el derecho de suspender o terminar su acceso a la plataforma en cualquier momento, con o sin aviso, por cualquier razón incluyendo la violación de estos Términos.`,
          `Puede dejar de usar NecesitoYa en cualquier momento. Estos Términos sobrevivirán a la terminación en la medida necesaria para hacer cumplir derechos y obligaciones.`
        ])}

        {section("18. Contáctenos", [
          `Si tiene preguntas sobre estos Términos de Servicio, contáctenos:`,
          `NecesitoYa / 32&8 LLC`,
          `Correo: hello@necesitoya.app`,
          `Sitio web: necesitoya.app`,
          `Haines City, Florida, Estados Unidos`
        ])}

        <div style={{ borderTop: '1px solid #e5e7eb', marginTop: '48px', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ color: '#9ca3af', fontSize: '13px' }}>© 2026 NecesitoYa · 32&8 LLC · Haines City, FL</p>
          <p style={{ marginTop: '8px' }}>
            <a href="/privacy" style={{ color: '#FF6B35', fontSize: '13px', marginRight: '16px', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="/" style={{ color: '#FF6B35', fontSize: '13px', textDecoration: 'none' }}>Home</a>
          </p>
        </div>
      </div>
    </main>
  )
}

function section(title, paragraphs) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1a1a2e', marginBottom: '12px', paddingBottom: '8px', borderBottom: '2px solid #FF6B35' }}>
        {title}
      </h2>
      {paragraphs.map((para, i) => (
        <p key={i} style={{ color: '#374151', fontSize: '14px', lineHeight: '1.8', marginBottom: '12px' }}>
          {para}
        </p>
      ))}
    </div>
  )
}