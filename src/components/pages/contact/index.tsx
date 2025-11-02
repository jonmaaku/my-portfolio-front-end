import { Box, Typography, Stack } from '@mui/material';
import { Email, Phone, LocationOn, LinkedIn, GitHub } from '@mui/icons-material';
import {
  ContactForm,
  ContactInfo,
  AvailabilityStatus,
  FAQSection,
  ContactInfoItem,
  ContactFormData,
} from '@/components/organisms/contact';

export default function ContactPageContent() {
  const contactInfo: ContactInfoItem[] = [
    {
      icon: <Email />,
      label: 'Email',
      value: 'jlacopiado@up.edu.ph',
      link: 'mailto:jlacopiado@up.edu.ph',
    },
    {
      icon: <Phone />,
      label: 'Phone',
      value: '+63 (977) 375-7052',
      link: 'tel:+639773757052',
    },
    {
      icon: <LocationOn />,
      label: 'Location',
      value: 'City, State, Country',
    },
    {
      icon: <LinkedIn />,
      label: 'LinkedIn',
      value: '/in/yourprofile',
      link: 'https://linkedin.com/in/yourprofile',
    },
    {
      icon: <GitHub />,
      label: 'GitHub',
      value: '@yourusername',
      link: 'https://github.com/yourusername',
    },
  ];

  const faqs = [
    {
      question: "What's your preferred way of communication?",
      answer:
        'Email is usually the best way to reach me for detailed discussions. For quick questions, feel free to reach out on LinkedIn.',
    },
    {
      question: 'Are you available for freelance work?',
      answer:
        "Yes, I'm always open to interesting freelance projects. Please include project details and timeline in your initial message.",
    },
    {
      question: 'What information should I include when reaching out?',
      answer:
        "Please include details about your project, timeline, budget (if applicable), and any specific requirements or technologies you'd like to use.",
    },
  ];

  const handleFormSubmit = async (data: ContactFormData): Promise<boolean> => {
    // Here you would typically send the form data to your backend API
    // For now, we'll simulate a submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Simulate success/failure
    return Math.random() > 0.2; // 80% success rate
  };

  return (
    <Box sx={{ padding: { xs: 2, md: 4 }, maxWidth: 1200, margin: '0 auto' }}>
      <Stack spacing={4}>
        {/* Header Section */}
        <Box textAlign="center">
          <Typography variant="h3" component="h1" gutterBottom>
            Get In Touch
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, margin: '0 auto' }}>
            I'm always interested in new opportunities and interesting projects. Let's discuss how
            we can work together!
          </Typography>
        </Box>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' },
            gap: 4,
          }}
        >
          {/* Contact Form */}
          <ContactForm onSubmit={handleFormSubmit} />

          {/* Contact Information */}
          <Box>
            <ContactInfo contactInfo={contactInfo} />
            <Box sx={{ marginTop: 3 }}>
              <AvailabilityStatus />
            </Box>
          </Box>
        </Box>

        {/* FAQ Section */}
        <FAQSection faqs={faqs} />
      </Stack>
    </Box>
  );
}
