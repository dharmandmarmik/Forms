import { Link } from "raviger";
import React, { useEffect, useState, useRef } from "react";

import { IFormField } from "../types/form";
import { initialState, handleSave } from "../utils/forms";
import FormInput from "./FormInput";

// HomeForm Component
const HomeForm = (props: { formId: Number }) => {
  const [form, setForm] = useState(() => initialState(props.formId));
  const [newState, setNewState] = useState("");

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  useEffect(() => {
    let timeout = setTimeout(() => {
      handleSave(form);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [form]);

  let addInput: IFormField = {
    type: "text",
    name: "",
    id: "add-input",
    placeholder: "Add Input",
  };

  let addInputField: IFormField = {
    type: "text",
    name: newState.split(" ").join(""),
    id: new Date().getTime().toString(),
    placeholder: newState,
  };

  const addField = (field: IFormField) => {
    setForm({
      ...form,
      formFields: [...form.formFields, field],
    });
  };

  const removeField = (field: IFormField) => {
    setForm({
      ...form,
      formFields: form.formFields.filter((f) => f.id !== field.id),
    });
  };

  const setValue = (value: string, id: string) => {
    setForm({
      ...form,
      formFields: form.formFields.map((f) => {
        if (f.id === id) {
          return { ...f, placeholder: value };
        }
        return f;
      }),
    });
  };

  // const handleClose = () => navigate("/");

  return (
    <form className="flex flex-col gap-2 divide-y-2 divide-dotted">
      <input
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="border border-gray-200 rounded p-2 w-full"
        ref={titleRef}
      />
      <div className="flex flex-col gap-4">
        {form.formFields.map((field) => (
          <FormInput
            field={field}
            removeField={removeField}
            key={field.id}
            setValue={setValue}
          />
        ))}
        <div className="flex flex-col" key={addInput.id}>
          <div className="flex gap-2">
            <input
              value={newState}
              onChange={(e) => setNewState(e.target.value)}
              {...addInputField}
              className="border border-gray-200 rounded p-2 w-full"
            />
            <button
              type="button"
              className="min-w-max bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => addField(addInputField)}
            >
              Add Input
            </button>
          </div>
        </div>

        <div className="flex w-auto gap-2">
          <button
            type="button"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded"
            onClick={() => handleSave(form)}
          >
            Save
          </button>
          <Link
            href="/"
            className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 my-4 rounded"
          >
            Close Form
          </Link>
        </div>
      </div>
    </form>
  );
};

export default HomeForm;
