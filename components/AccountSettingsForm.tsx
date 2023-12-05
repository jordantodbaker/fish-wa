import React from "react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import {
  useUpdateUserMutation,
  UpdateUserValues,
} from "@/generated/graphql-frontend";

interface Props {
  userId: number;
  values: UpdateUserValues;
  setValues: () => void;
}

const AccountSettingForm: React.FC<Props> = ({ userId, values, setValues }) => {
  const [updateUser, { loading }] = useUpdateUserMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("handlilng change");
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await updateUser({
        variables: {
          input: {
            userId,
            phoneNumber: values.phoneNumber,
            sendEmail: values.sendEmail,
            sendText: values.sendText,
          },
        },
      });
    } catch (e) {}
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label className="field-label">Phone Number</label>
        <Input
          type="number"
          name="phoneNumber"
          className="text-input"
          onChange={handleChange}
          value={values.phoneNumber}
        />
      </p>
      <p className="mt-4">
        <Checkbox
          onValueChange={(isSelected: boolean) =>
            setValues((prevValues) => ({
              ...prevValues,
              sendText: isSelected,
            }))
          }
          name="sendText"
        >
          Sent Text Notifications
        </Checkbox>
      </p>
      <p className="mt-4">
        <Checkbox
          onValueChange={(isSelected: boolean) =>
            setValues((prevValues) => ({
              ...prevValues,
              sendEmail: isSelected,
            }))
          }
          name="sendEmail"
        >
          Sent Email Notifications
        </Checkbox>
      </p>
      <p className="mt-6">
        <Button className="button" type="submit">
          Save
        </Button>
      </p>
    </form>
  );
};

export default AccountSettingForm;
