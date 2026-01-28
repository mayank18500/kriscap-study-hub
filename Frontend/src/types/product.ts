export interface Product {
    _id: string; // MongoDB ID
    name: string;
    type: 'TMA' | 'PROJECT';
    class: string;
    medium: string;
    subject: string;
    price: number;
    description?: string;
    fileUrl?: string; // Only present if purchased/unlocked? Actually usually backend hides this until purchased.
    rating?: number;
    reviews?: number;
    category?: 'TEXT' | 'HANDWRITTEN';
}
