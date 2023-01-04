export interface IFormData {
  id: Number;
  title: string;
  formFields: IFormField[];
}

export interface IFormField {
  type: string;
  name: string;
  id: string;
  placeholder: string;
  max?: string;
}
