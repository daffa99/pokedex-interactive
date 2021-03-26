import React, { useState } from "react";
import {
  Box,
  Image,
  Button,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
  PopoverFooter,
  ButtonGroup,
  PopoverTrigger,
  Progress,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
// import { Formik } from "formik";
import pokeball from "../assets/pokeball.png";

function CatchButton(props) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => {
    setIsOpen(!isOpen);
  };
  const close = () => {
    setIsOpen(false);
  };
  console.log("CatchSuccess", props.catchSuccess);
  return (
    <React.Fragment>
      <Box
        bottom="0"
        right="0"
        position="fixed"
        zIndex="banner"
        shadow="lg"
        borderRadius="full"
      >
        <Button
          variant="ghost"
          boxSize="100px"
          width="100%"
          rounded="full"
          onClick={open}
        >
          <Image src={pokeball} />
        </Button>
      </Box>
      <Popover
        isOpen={isOpen}
        onClose={close}
        closeOnBlur={false}
        colorScheme="green"
      >
        <PopoverTrigger>
          <Box bottom="100px" right="0" position="fixed"></Box>
        </PopoverTrigger>
        <PopoverContent width="100%">
          {props.catchSuccess ? (
            <CatchSuccessContent {...props} />
          ) : (
            <InitialContent {...props} />
          )}
        </PopoverContent>
      </Popover>
    </React.Fragment>
  );
}

const InitialContent = (props) => {
  return (
    <React.Fragment>
      <PopoverHeader fontWeight="semibold" textTransform="capitalize">
        Catch {props.pokemonName}
      </PopoverHeader>
      <PopoverCloseButton />
      <PopoverBody>
        {props.catchLoading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <React.Fragment>
            Are you sure you want to catch this Pokemon?{" "}
            <strong>(Success probability {props.catchProbability}%)</strong>
          </React.Fragment>
        )}
      </PopoverBody>
      <PopoverFooter d="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button
            variant="outline"
            onClick={close}
            disabled={props.catchLoading}
          >
            Cancel
          </Button>
          <Button
            colorScheme="red"
            onClick={props.catchPokemon}
            isLoading={props.catchLoading}
            loadingText="Catching..."
          >
            Catch
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </React.Fragment>
  );
};

const SetNicknameForm = (props) => {
  const [nickname, setNickname] = useState("");
  const handleChange = (e) => {
    console.log(e.target.value);
    setNickname(e.target.value);
    console.log("nickname", nickname);
  };
  return (
    <React.Fragment>
      <PopoverBody>
        <FormControl>
          <FormLabel htmlFor="nickname" textTransform="capitalize">
            Your {props.pokemonName}&apos;s Nickname
          </FormLabel>
          <Input id="nickname" onChange={handleChange} />
        </FormControl>
      </PopoverBody>
      <PopoverFooter d="flex" justifyContent="flex-end">
        <ButtonGroup size="sm">
          <Button
            colorScheme="red"
            isLoading={props.isSaving}
            loadingText="Saving..."
            disabled={!nickname}
            onClick={() => props.saveNickname(nickname)}
          >
            Save
          </Button>
        </ButtonGroup>
      </PopoverFooter>
    </React.Fragment>
  );
};

const CatchSuccessContent = (props) => {
  return (
    <React.Fragment>
      <PopoverHeader fontWeight="semibold" textTransform="capitalize">
        Gotcha!
      </PopoverHeader>
      <PopoverCloseButton />
      <SetNicknameForm {...props} />
    </React.Fragment>
  );
};

export default CatchButton;