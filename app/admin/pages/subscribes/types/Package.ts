export interface Package {
    id: string;
    name: string;
    description: string;
    price: number;
    billingCycle: 'monthly' | 'yearly';
    features: string[];
    status: 'active' | 'inactive';
    maxUsers?: number;
    maxProjects?: number;
    storageLimit?: number;
    createdAt: Date;
    updatedAt: Date;
  }