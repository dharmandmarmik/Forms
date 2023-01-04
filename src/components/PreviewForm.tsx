import React, { useEffect, useState } from "react";

import { IFormData } from "../types/form";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getLocalForms } from "../utils/forms";
import { navigate } from "raviger";

const findForm = (formId: Number): IFormData => {
  const forms = getLocalForms();
  const form = forms.find((form) => form.id === formId);
  if (!form || form === undefined) {
    navigate("/");
  } else {
    return form;
  }
  return forms[0];
};

const getInitialState = (formId: Number, questionId: number) => {
  const form = findForm(formId);
  let question;
  if (questionId && form.formFields.length > questionId) {
    question = form.formFields[questionId];
  } else {
    question = form.formFields[0];
  }
  return {
    form,
    questionId,
    question,
  };
};

const getInitialAnswerState = (form: IFormData) => {
  const answers: string[] = [];
  form.formFields.forEach((field, idx) => {
    answers[idx] = "";
  });
  return answers;
};

const PreviewForm = (props: { formId: Number }) => {
  const [state, setState] = useState(getInitialState(props.formId, 0));
  const { form, question } = state;
  const [questionId, setQuestionId] = useState(state.questionId);
  const [answers, setAnswers] = useState(getInitialAnswerState(form));

  useEffect(() => {
    setState(getInitialState(props.formId, questionId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionId]);

  return (
    <div className="flex flex-col flex-1">
      <div className="flex w-full my-3">
        <h2 className="text-3xl font-semibold">Preview</h2>
      </div>
      <div className="flex flex-col">
        <div className="preview-form__content__item">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-search"
          >
            {question?.placeholder}
          </label>
          <input
            className="appearance-none block w-full bg-slate-100 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none"
            id={question?.id}
            name={question?.placeholder}
            placeholder={question?.placeholder}
            value={answers[questionId]}
            onChange={(e) => {
              setAnswers({ ...answers, [questionId]: e.target.value });
            }}
          />
        </div>
        {/* buttons */}
        <div className="flex justify-end w-full gap-2">
          {questionId > 0 && (
            <button
              type="button"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 my-4 rounded"
              onClick={() => questionId > 0 && setQuestionId(questionId - 1)}
            >
              <FontAwesomeIcon icon={faArrowLeft} /> Previous
            </button>
          )}
          {questionId < form.formFields.length - 1 && (
            <button
              onClick={() =>
                questionId < form.formFields.length - 1 &&
                setQuestionId(questionId + 1)
              }
              className="bg-rose-500 hover:bg-rose-700 text-white font-bold py-2 px-4 my-4 rounded"
            >
              Next <FontAwesomeIcon icon={faArrowRight} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewForm;
