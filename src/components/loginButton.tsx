// "use client";
// import React, { useState } from "react";
// import { signIn } from "next-auth/react";

// const LoginButton = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   return (
//     <button
//       onClick={() => {
//         setIsLoading(true);
//         // next-auth signIn() function doesn't work yet at Edge Runtime due to usage of BroadcastChannel
//         // signIn("google", { callbackUrl: `/` });
//       }}>
//       {isLoading ? <p>please wait</p> : <p>signin</p>}
//     </button>
//   );
// };
// export default LoginButton;
