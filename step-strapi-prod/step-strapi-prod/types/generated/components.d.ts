import type { Schema, Attribute } from '@strapi/strapi';

export interface CardCollegeCard extends Schema.Component {
  collectionName: 'components_card_college_cards';
  info: {
    displayName: 'collegeCard';
    description: '';
  };
  attributes: {
    collegeFrame: Attribute.String;
    collegeTitle: Attribute.String;
    collegeDesc: Attribute.Text;
    image: Attribute.Media<'images' | 'videos' | 'audios' | 'files'>;
  };
}

export interface CardFooterCard extends Schema.Component {
  collectionName: 'components_card_footer_cards';
  info: {
    displayName: 'FooterCard';
  };
  attributes: {
    companyLogo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    address: Attribute.Text;
    copyRight: Attribute.Text;
  };
}

export interface CardFuturePlanCard extends Schema.Component {
  collectionName: 'components_card_future_plan_cards';
  info: {
    displayName: 'FuturePlanCard';
  };
  attributes: {
    planTitle: Attribute.String;
    planDescription: Attribute.Text;
  };
}

export interface CardInternshipCard extends Schema.Component {
  collectionName: 'components_card_internship_cards';
  info: {
    displayName: 'InternshipCard';
    description: '';
  };
  attributes: {
    jobName: Attribute.String;
    company: Attribute.String;
    jobDesc: Attribute.Text;
    place: Attribute.String & Attribute.Required;
    duration: Attribute.String;
    amount: Attribute.String;
    vacancy: Attribute.String;
    content: Attribute.Blocks;
  };
}

export interface CardJourneyCard extends Schema.Component {
  collectionName: 'components_card_journey_cards';
  info: {
    displayName: 'JourneyCard';
  };
  attributes: {
    title: Attribute.String;
    year: Attribute.Integer;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface CardLocation extends Schema.Component {
  collectionName: 'components_card_locations';
  info: {
    displayName: 'Location';
    description: '';
  };
  attributes: {
    location: Attribute.String & Attribute.Required;
  };
}

export interface CardManagementCard extends Schema.Component {
  collectionName: 'components_card_management_cards';
  info: {
    displayName: 'managementCard';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Attribute.String;
    post: Attribute.String;
    designation: Attribute.String;
    linkedin: Attribute.String;
  };
}

export interface CardTestimonioalCard extends Schema.Component {
  collectionName: 'components_card_testimonioal_cards';
  info: {
    displayName: 'TestimonioalCard';
  };
  attributes: {
    profile: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    Name: Attribute.String;
    SocialMedia: Attribute.String;
    Logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Attribute.Text;
  };
}

export interface CompanyLogoCompanyLogo extends Schema.Component {
  collectionName: 'components_company_logo_company_logos';
  info: {
    displayName: 'CompanyLogo';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    alt: Attribute.String;
    link: Attribute.String;
  };
}

export interface CompanySuccessCompanySuccess extends Schema.Component {
  collectionName: 'components_company_success_company_successes';
  info: {
    displayName: 'CompanySuccess';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    number: Attribute.Integer;
  };
}

export interface ContactContact extends Schema.Component {
  collectionName: 'components_contact_contacts';
  info: {
    displayName: 'contact';
    description: '';
  };
  attributes: {
    email: Attribute.Email;
    phoneNumber1: Attribute.String;
    Address: Attribute.Text;
    phoneNumber2: Attribute.String;
  };
}

export interface HeadingDescriptionHeadingAndDescription
  extends Schema.Component {
  collectionName: 'components_heading_description_heading_and_descriptions';
  info: {
    displayName: 'heading & description';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
  };
}

export interface ImageAcceleropreneurImages extends Schema.Component {
  collectionName: 'components_image_acceleropreneur_images';
  info: {
    displayName: 'acceleropreneurImages';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    alt: Attribute.String & Attribute.Required;
    link: Attribute.String;
  };
}

export interface ImageBeneficiariesImages extends Schema.Component {
  collectionName: 'components_image_beneficiaries_images';
  info: {
    displayName: 'beneficiariesImages';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    alt: Attribute.String & Attribute.Required;
  };
}

export interface ImageCompanyLogos extends Schema.Component {
  collectionName: 'components_image_company_logos';
  info: {
    displayName: 'CompanyLogos';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ImageEcosystemImage extends Schema.Component {
  collectionName: 'components_image_ecosystem_images';
  info: {
    displayName: 'EcosystemImage';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images'>;
  };
}

export interface ImageEventImages extends Schema.Component {
  collectionName: 'components_image_event_images';
  info: {
    displayName: 'EventImages';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    alt: Attribute.String;
  };
}

export interface ImageProfileCard extends Schema.Component {
  collectionName: 'components_image_profile_cards';
  info: {
    displayName: 'profileCard';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    name: Attribute.String & Attribute.Required;
    linkedin: Attribute.String;
    designation: Attribute.String;
    company: Attribute.String;
  };
}

export interface ImageSisfBeneficiariesImage extends Schema.Component {
  collectionName: 'components_image_sisf_beneficiaries_images';
  info: {
    displayName: 'sisfBeneficiariesImage';
    description: '';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    alt: Attribute.String & Attribute.Required;
    link: Attribute.String;
  };
}

export interface SocialiconsSocialIcons extends Schema.Component {
  collectionName: 'components_socialicons_social_icons';
  info: {
    displayName: 'socialIcons';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
    link: Attribute.String & Attribute.Required;
  };
}

export interface TitleAchievementHeading extends Schema.Component {
  collectionName: 'components_title_achievement_headings';
  info: {
    displayName: 'AchievementHeading';
    description: '';
  };
  attributes: {
    title: Attribute.String;
    heading: Attribute.Text;
    description: Attribute.Text;
  };
}

export interface TitleAchievements extends Schema.Component {
  collectionName: 'components_title_achievements';
  info: {
    displayName: 'Achievements';
    description: '';
  };
  attributes: {
    title: Attribute.String & Attribute.Required;
    description: Attribute.Text & Attribute.Required;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'> &
      Attribute.Required;
  };
}

export interface TitleMarquee extends Schema.Component {
  collectionName: 'components_title_marquees';
  info: {
    displayName: 'marquee';
    description: '';
  };
  attributes: {
    title: Attribute.Text & Attribute.Required;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'card.college-card': CardCollegeCard;
      'card.footer-card': CardFooterCard;
      'card.future-plan-card': CardFuturePlanCard;
      'card.internship-card': CardInternshipCard;
      'card.journey-card': CardJourneyCard;
      'card.location': CardLocation;
      'card.management-card': CardManagementCard;
      'card.testimonioal-card': CardTestimonioalCard;
      'company-logo.company-logo': CompanyLogoCompanyLogo;
      'company-success.company-success': CompanySuccessCompanySuccess;
      'contact.contact': ContactContact;
      'heading-description.heading-and-description': HeadingDescriptionHeadingAndDescription;
      'image.acceleropreneur-images': ImageAcceleropreneurImages;
      'image.beneficiaries-images': ImageBeneficiariesImages;
      'image.company-logos': ImageCompanyLogos;
      'image.ecosystem-image': ImageEcosystemImage;
      'image.event-images': ImageEventImages;
      'image.profile-card': ImageProfileCard;
      'image.sisf-beneficiaries-image': ImageSisfBeneficiariesImage;
      'socialicons.social-icons': SocialiconsSocialIcons;
      'title.achievement-heading': TitleAchievementHeading;
      'title.achievements': TitleAchievements;
      'title.marquee': TitleMarquee;
    }
  }
}
