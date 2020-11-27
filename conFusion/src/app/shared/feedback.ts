export class Feedback{
    id?: string
    fisrtname: string;
    lastname: string;
    telnum: number;
    email: string;
    agree: boolean;
    concattype: string;
    message: string;
}

export const ContactType=['None', 'Tel', 'Email'];