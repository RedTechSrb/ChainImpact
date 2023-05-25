import React, { useState } from "react";
import {
  Modal,
  Input,
  Textarea,
  Checkbox,
  Col,
  Text,
  Grid,
  Button,
  TextInput,
  Group,
  Image,
  Avatar,
  Flex,
} from "@mantine/core";
import {
  Dropzone,
  DropzoneProps,
  FileWithPath,
  IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
import { IconPhoto, IconUpload, IconX } from "@tabler/icons";

export default function UserProfileModal({
  isOpen,
  onClose,
  onClickPhantom,
}: {
  isOpen: boolean;
  onClose: () => void;
  onClickPhantom: () => void;
}) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");
  const [isCompany, setIsCompany] = useState(false);
  const [twitter, setTwitter] = useState("");
  const [profileImage, setProfileImage] = useState<FileWithPath[]>([]);

  const handleSubmit = () => {
    // Perform form submission and user profile update here
    // You can access the form values from the state variables (name, password, etc.)
    // Handle any additional logic, validation, and API calls as needed
    // Close the modal after the form is submitted successfully
    onClose();
  };

  const previews = profileImage.map((file, index) => {
    const imageUrl = URL.createObjectURL(file);
    return (
      <Avatar
        key={index}
        src={imageUrl}
        radius="xl"
        imageProps={{ onLoad: () => URL.revokeObjectURL(imageUrl) }}
        size="xl"
      />
    );
  });

  const placeholderAvatar = <Avatar radius="xl" size="xl" />;

  const profileImagePreview =
    profileImage.length > 0 ? previews : placeholderAvatar;

  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Add more info about yourself"
      size={"xl"}
    >
      <Grid gutter="sm">
        <Grid.Col span={6}>
          <Flex gap="md" justify="center" direction="column" wrap="wrap">
            <div>
              Profile Image
              {profileImagePreview}
            </div>
            <TextInput
              label="Username"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
            <TextInput
              type="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <TextInput
              type="password"
              label="Confirm Password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <Textarea
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
            <TextInput
              label="Twitter"
              value={twitter}
              onChange={(event) => setTwitter(event.target.value)}
            />
            <Checkbox
              label="Company Account"
              checked={isCompany}
              onChange={() => setIsCompany(!isCompany)}
              description="Only companies can be an Angel Impactors. This way your profile will need to be verified by our team."
            />
            <Flex
              gap="sm"
              justify="center"
              align="center"
              direction="row"
              wrap="wrap"
            >
              <Button color="blue" onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </Flex>
        </Grid.Col>
        <Grid.Col span={6}>
          <Dropzone
            onDrop={setProfileImage}
            onReject={(files) => console.log("rejected files", files)}
            maxSize={3 * 1024 ** 2}
            accept={IMAGE_MIME_TYPE}
          >
            <Group
              position="center"
              spacing="xl"
              style={{ minHeight: 220, pointerEvents: "none" }}
            >
              <Dropzone.Accept>
                <IconUpload size={50} stroke={1.5} />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX size={50} stroke={1.5} />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconPhoto size={50} stroke={1.5} />
              </Dropzone.Idle>

              <div>
                <Text size="xl" inline>
                  Drag images here or click to select files
                </Text>
                <Text size="sm" color="dimmed" inline mt={7}>
                  Attach as many files as you like, each file should not exceed
                  5mb
                </Text>
              </div>
            </Group>
          </Dropzone>
        </Grid.Col>
      </Grid>
    </Modal>
  );
}
