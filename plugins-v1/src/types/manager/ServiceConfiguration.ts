import * as Flex from '@twilio/flex-ui';

type FlexUIAttributes = Flex.ServiceConfiguration['ui_attributes'];

// feature: activity-skill-filter
export type ActivitySkillFilterRule = {
  required_skill: string;
  sort_order: number;
};

export type ActivitySkillFilterRules = {
  [key: string]: ActivitySkillFilterRule;
};

// feature: activity-reservation-handler
export type SystemActivityNames = {
  [index: string]: string;
  available: string;
};

export interface UIAttributes extends FlexUIAttributes {
  custom_data: {
    serverlessFunctionsDomain: string;
    features: {
      external_transfer: {
        enabled: boolean;
      };
    };
  };
}
