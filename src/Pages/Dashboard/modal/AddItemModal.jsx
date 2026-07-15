import { X } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = (isDueDate) =>
  Yup.object({
    name: Yup.string()
      .trim()
      .required("This field is required")
      .max(100, "Maximum 100 characters"),

    content: Yup.string()
      .trim()
      .required("This field is required")
      .max(1000, "Maximum 1000 characters"),
    dueDate: isDueDate
      ? Yup.date().required("Please let us know the due date")
      : Yup.mixed().notRequired(),
  });

const AddItemModal = ({
  open,
  onClose,
  modalConfig,
  nameLabel = "Title",
  contentLabel = "Description",
  dateLabel = "Due Date",
  buttonText = "Save",
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800">
            {modalConfig.title}
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <Formik
          initialValues={{
            name: "",
            content: "",
            dueDate: "",
          }}
          validationSchema={validationSchema(modalConfig.isDueDate)}
          onSubmit={async (values, actions) => {
            await modalConfig.onSubmit(values);
            actions.resetForm();
            onClose();
          }}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-5 p-6">
              {/* Name */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {nameLabel}
                </label>

                <Field
                  name="name"
                  type="text"
                  placeholder={`Enter ${nameLabel.toLowerCase()}`}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition outline-none focus:border-violet-500"
                />

                <ErrorMessage
                  name="name"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {/* Content */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  {contentLabel}
                </label>

                <Field
                  as="textarea"
                  name="content"
                  rows={5}
                  placeholder={`Write ${contentLabel.toLowerCase()}...`}
                  className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition outline-none focus:border-violet-500"
                />

                <ErrorMessage
                  name="content"
                  component="p"
                  className="mt-1 text-sm text-red-500"
                />
              </div>

              {modalConfig.isDueDate && (
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    {dateLabel}
                  </label>

                  <Field
                    type="date"
                    name="dueDate"
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition outline-none focus:border-violet-500"
                  />

                  <ErrorMessage
                    name="dueDate"
                    component="p"
                    className="mt-1 text-sm text-red-500"
                  />
                </div>
              )}

              {/* Footer */}
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-gray-300 px-5 py-2.5 font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl bg-violet-600 px-5 py-2.5 font-medium text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {buttonText}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddItemModal;
