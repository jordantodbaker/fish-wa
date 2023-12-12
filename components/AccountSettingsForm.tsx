import React, { useState, Dispatch, SetStateAction } from "react";
import { Button, Checkbox, Input } from "@nextui-org/react";
import {
  useUpdateUserMutation,
  UpdateUserValues,
  User,
} from "@/generated/graphql-frontend";

interface Props {
  user: User;
  setUser: Dispatch<SetStateAction<User | null>>;
}

const AccountSettingForm: React.FC<Props> = ({ user, setUser }) => {
  const [updateUser, { loading }] = useUpdateUserMutation();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUser((prevUser) => ({ ...(prevUser as User), email: value }));
  };
  const [phoneNumberError, setPhoneNumberError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user.phoneNumber && user?.phoneNumber!.length === 10) {
      try {
        const result = await updateUser({
          variables: {
            input: {
              userId: user.id,
              phoneNumber: user.phoneNumber,
              sendEmail: user.sendEmail,
              sendText: user.sendText,
            },
          },
        });
      } catch (e) {}
    } else {
      setPhoneNumberError(
        "Phone number must be 10 character long. Ex: 5551235555"
      );
    }
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
          value={user.phoneNumber!}
          errorMessage={phoneNumberError}
          startContent={<span className="mr-2">+1</span>}
        />
      </p>
      <p className="mt-4">
        <Checkbox
          onValueChange={(isSelected: boolean) =>
            setUser((prevUser) => ({
              ...(prevUser as User),
              sendText: isSelected,
            }))
          }
          name="sendText"
          isSelected={user.sendText!}
        >
          Sent Text Notifications
        </Checkbox>
      </p>
      <p className="mt-4">
        <Checkbox
          onValueChange={(isSelected: boolean) =>
            setUser((prevUser) => ({
              ...(prevUser as User),
              sendEmail: isSelected,
            }))
          }
          name="sendEmail"
          isSelected={user.sendEmail!}
        >
          Sent Email Notifications
        </Checkbox>
      </p>
      <p className="mt-6">
        <Button className="button" color="primary" type="submit">
          Save
        </Button>
      </p>
    </form>
  );
};

export default AccountSettingForm;
