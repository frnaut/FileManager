import { DocumentModel } from '../DocumentModel';

export class PersonaResponse {
    name: string;
    lastName: string;
    identification: string;
    profileImage: string;
    id: number;
    documents: DocumentModel[];
}