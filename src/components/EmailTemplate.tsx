import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  service,
  message,
}) => (
  <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', color: '#1a1a1a', padding: '40px 20px', maxWidth: '600px', margin: '0 auto' }}>
    
    {/* Header */}
    <div style={{ paddingBottom: '20px', borderBottom: '1px solid #e5e5e5', marginBottom: '30px' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>New Lead Received</h1>
      <p style={{ fontSize: '14px', color: '#666', margin: '5px 0 0' }}>via pivotalbuildersinc.com</p>
    </div>

    {/* Details Box */}
    <div style={{ backgroundColor: '#f5f5f5', padding: '25px', borderRadius: '12px', marginBottom: '30px' }}>
      <p style={{ margin: '0 0 10px' }}><strong style={{ color: '#000' }}>Name:</strong> {name}</p>
      <p style={{ margin: '0 0 10px' }}><strong style={{ color: '#000' }}>Email:</strong> <a href={`mailto:${email}`} style={{ color: '#0066cc', textDecoration: 'none' }}>{email}</a></p>
      <p style={{ margin: '0 0 10px' }}><strong style={{ color: '#000' }}>Phone:</strong> <a href={`tel:${phone}`} style={{ color: '#0066cc', textDecoration: 'none' }}>{phone}</a></p>
      <p style={{ margin: '0 0 0' }}><strong style={{ color: '#000' }}>Service:</strong> {service}</p>
    </div>

    {/* Message Body */}
    <div>
      <h3 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '10px' }}>Project Details:</h3>
      <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#333', whiteSpace: 'pre-wrap', backgroundColor: '#fff', border: '1px solid #e5e5e5', padding: '15px', borderRadius: '8px' }}>
        {message}
      </p>
    </div>

    {/* Footer */}
    <div style={{ marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #e5e5e5', fontSize: '12px', color: '#888', textAlign: 'center' }}>
      <p>Sent from Pivotal Builders Website Contact Form.</p>
    </div>
  </div>
);