import { Box, Flex, Image } from "@chakra-ui/react";
import { signIn, signOut, useSession } from "next-auth/react";

function Authentication() {
  const { data: session } = useSession();

  return (
    <Flex justifyContent="space-between">
      <Flex width="100%" justifyContent="space-between" mb="4">
        {session ? (
          <>
            <Flex display={session ? "flex" : "none"}>
              <Image
                filter="invert(100%)"
                mr="2"
                width="1.5rem"
                src="/images/user.svg"
                alt="Profile picture"
              />
              <Box>User</Box>
            </Flex>
            <button onClick={() => signOut()}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={() => signIn()}>Sign In</button>
          </>
        )}
      </Flex>
    </Flex>
  );
}

export default Authentication;
