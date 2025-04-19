import { useState, useRef } from "react";
import {
  Form,
  Field,
  FormElement,
  FormRenderProps,
  FieldWrapper,
} from "@progress/kendo-react-form";
import {
  DropDownList,
  DropDownListChangeEvent,
} from "@progress/kendo-react-dropdowns";
import LabelInput from "@/components/kendo/form/LabelInput.tsx";

export default function KendoForm() {
  const [ddlState, setDdlState] = useState();
  const ddlRef = useRef(null);
  const sizes = ["X-Small", "Small", "Medium", "Large", "X-Large", "2X-Large"];
  const handleSubmit = (dataItem: { [name: string]: unknown }) =>
    alert(JSON.stringify(dataItem, null, 2));
  return (
    <Form
      onSubmit={handleSubmit}
      render={(formRenderProps: FormRenderProps) => (
        <FormElement horizontal style={{ maxWidth: 650 }}>
          <fieldset className="k-form-fieldset">
            <legend className="k-form-legend">Add Company</legend>
            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="companyName"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Company Name"
                  type="email"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="yearFounded"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Year Founded"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="websiteUrl"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="WebSite URL"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="description"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Company Description"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="street1"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Street Address"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="street2"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Street Address2"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="city"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="City"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="state"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="State/Province"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="country"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Country"
                />
              </div>
            </FieldWrapper>

            <FieldWrapper>
              <div className="k-form-field-wrap">
                <Field
                  name="zipCode"
                  component={LabelInput}
                  labelClassName="k-form-label"
                  label="Zip/Postal ID"
                />
              </div>
            </FieldWrapper>
          </fieldset>
          <DropDownList
            ref={ddlRef}
            id="sizes-label"
            ariaLabelledBy="sizes-editor"
            value={ddlState}
            data={sizes}
            onChange={(e: DropDownListChangeEvent) =>
              setDdlState(e.target.value)
            }
          />
          <div className="k-form-buttons">
            <button
              type="submit"
              className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-base"
              disabled={!formRenderProps.allowSubmit}
            >
              Submit
            </button>
          </div>
        </FormElement>
      )}
    />
  );
}
