import React from "react";
import { useForm } from "react-hook-form"; // React Hook Form for form handling

interface Field {
  id: string;
  type: string;
  label: string;
  required?: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[]; // For select and radio types
  validation?: { pattern: string; message: string }; // For validation pattern
}

interface FormGeneratorProps {
  schema: { fields: Field[] }; // Define schema shape for the form
}

export const FormGenerator: React.FC<FormGeneratorProps> = ({ schema }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log("Form submitted with data:", data);
    alert("Form submitted successfully!"); // Show success alert
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {schema?.fields?.map((field, index) => {
        // For text, email, and textarea input fields
        if (field.type === "text" || field.type === "email" || field.type === "textarea") {
          return (
            <div key={index} className="flex flex-col">
              <label htmlFor={field.id} className="font-medium">{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className="border p-2 mt-1"
                {...register(field.id, { 
                  required: field.required,
                  pattern: field.validation?.pattern ? { value: new RegExp(field.validation.pattern), message: field.validation?.message } : undefined
                })}
              />
              {errors[field.id] && <span className="text-red-500">{field.validation?.message}</span>}
            </div>
          );
        }
        // For select fields (dropdown)
        else if (field.type === "select") {
          return (
            <div key={index} className="flex flex-col">
              <label htmlFor={field.id} className="font-medium">{field.label}</label>
              <select
                id={field.id}
                className="border p-2 mt-1"
                {...register(field.id, { required: field.required })}
              >
                {field.options?.map((option, idx) => (
                  <option key={idx} value={option.value}>{option.label}</option>
                ))}
              </select>
              {errors[field.id] && <span className="text-red-500">This field is required</span>}
            </div>
          );
        }
        // For radio buttons
        else if (field.type === "radio") {
          return (
            <div key={index} className="flex flex-col">
              <label className="font-medium">{field.label}</label>
              {field.options?.map((option, idx) => (
                <label key={idx} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value={option.value}
                    {...register(field.id, { required: field.required })}
                    className="mr-2"
                  />
                  <span>{option.label}</span>
                </label>
              ))}
              {errors[field.id] && <span className="text-red-500">This field is required</span>}
            </div>
          );
        }
        return null;
      })}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit</button>
    </form>
  );
};
