import React, { useState } from "react";
import {
  TextInput,
  Textarea,
  Button,
  Select,
  Container,
  Header,
  Title,
} from "@mantine/core";
import { Charity } from "../models/Charity";
import { Project } from "../models/Project";

const causeTypes = ["Type 1", "Type 2", "Type 3", "Type 4", "Type 5", "Type 6"];

function ProjectProposalPage() {
  const [charity, setCharity] = useState<Charity>({
    id: 0,
    name: "",
    wallet: null,
    website: null,
    facebook: null,
    discord: null,
    twitter: null,
    imageurl: null,
    description: null,
  });

  const handleSubmitCharity = (event: any) => {
    event.preventDefault();
    const newCharity: Charity = {
      id: 0,
      name: event.target.name.value,
      wallet: null,
      website: event.target.website.value || null,
      facebook: event.target.facebook.value || null,
      discord: event.target.discord.value || null,
      twitter: event.target.twitter.value || null,
      imageurl: null,
      description: event.target.description.value || null,
    };

    setCharity(newCharity);
  };

  const handleSubmitProject = (event: any) => {
    event.preventDefault();
    const newProject: Project = {
      id: 0,
      charity: charity,
      name: event.target.name.value,
      description: event.target.description.value || null,
      financialgoal: parseFloat(event.target.financialgoal.value),
      totaldonated: 0,
      website: event.target.website.value || null,
      facebook: event.target.facebook.value || null,
      discord: event.target.discord.value || null,
      twitter: event.target.twitter.value || null,
      instagram: event.target.instagram.value || null,
      imageurl: null,
      totalbackers: 0,
      angelimpactor: null,
      primarycausetype: event.target.primarycausetype.value,
      secondarycausetype: event.target.secondarycausetype.value,
    };

    // Submit the new project object
    console.log(newProject);
  };

  return (
    <div>
      <Container size={"lg"}>
        <Title mt="20px">Are you a charity looking to propose a project?</Title>
        <Title size={"xl"} mb="20px">
          Enter the charity details and project details below
        </Title>
        <form onSubmit={handleSubmitCharity}>
          <TextInput label="Charity Name" name="name" required />
          <TextInput label="Website" name="website" />
          <TextInput label="Facebook" name="facebook" />
          <TextInput label="Discord" name="discord" />
          <TextInput label="Twitter" name="twitter" />
          <Textarea label="Description" name="description" />
          <Button type="submit">Save Charity</Button>
        </form>
        <form onSubmit={handleSubmitProject}>
          <TextInput label="Project Name" name="name" required />
          <Textarea label="Project Description" name="description" />
          <TextInput
            type="number"
            label="Financial Goal"
            name="financialgoal"
            required
          />
          <TextInput label="Website" name="website" />
          <TextInput label="Facebook" name="facebook" />
          <TextInput label="Discord" name="discord" />
          <TextInput label="Twitter" name="twitter" />
          <TextInput label="Instagram" name="instagram" />
          <Select
            label="Primary Cause Type"
            name="primarycausetype"
            data={causeTypes}
            required
          />
          <Select
            label="Secondary Cause Type"
            name="secondarycausetype"
            data={causeTypes}
          />
          <Button type="submit">Submit Project</Button>
        </form>
      </Container>
    </div>
  );
}

export default ProjectProposalPage;
