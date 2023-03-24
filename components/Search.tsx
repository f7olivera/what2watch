import { CloseIcon } from "@chakra-ui/icons";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function Search({ alwaysVisible }: { alwaysVisible: boolean }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        router.push(
          `/search?q=${
            (
              (e.target as HTMLFormElement).elements.namedItem(
                "q"
              ) as HTMLInputElement
            ).value
          }`
        );
        e.preventDefault();
      }}
    >
      <InputGroup display={!alwaysVisible ? { base: "none", sm: "unset" } : {}}>
        <InputRightElement
          display={searchTerm ? "flex" : "none"}
          lineHeight="0"
          height="2.25rem"
          top="unset"
        >
          <button
            type="button"
            onClick={() => {
              const input: HTMLInputElement | null =
                document.querySelector('input[name="q"]');
              if (input) {
                input.value = "";
                input.focus();
              }
              setSearchTerm("");
            }}
          >
            <CloseIcon color="lightgray" />
          </button>
        </InputRightElement>
        <Input
          height="2.25rem"
          onInput={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
          width="100%"
          name="q"
          placeholder="Search"
          border="1px"
          type="text"
          borderColor="storm"
          backgroundColor="black"
          borderRadius="xl"
        />
      </InputGroup>
      <input type="submit" hidden={true} />
    </form>
  );
}

export default Search;
