import { IFormData, IFormField } from "../types/form";

// Default fields
export const formFields: IFormField[] = [];

export const getLocalForms: () => IFormData[] = () => {
  const localForms = localStorage.getItem("formDatas");
  if (localForms) {
    return JSON.parse(localForms);
  }
  return [];
};

export const initialState: (id: Number) => IFormData = (id) => {
  const formData = getLocalForms();
  if (formData.length > 0) {
    for (let i = 0; i < formData.length; i++) {
      if (formData[i].id === id) {
        return formData[i];
      }
    }
  }
  const newForm = {
    id,
    title: "Untitled Form",
    formFields: formFields,
  };
  saveLocalForms([...formData, newForm]);
  return newForm;
};

const saveLocalForms = (localForms: IFormData[]) => {
  localStorage.setItem("formDatas", JSON.stringify(localForms));
};

export const handleSave = (state: IFormData) => {
  const localForms = getLocalForms();
  const updatedLocalForms = localForms.map((f) => {
    if (f.id === state.id) {
      return state;
    }
    return f;
  });
  saveLocalForms(updatedLocalForms);
};
