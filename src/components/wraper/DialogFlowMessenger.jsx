import React, { useEffect } from "react";

const DialogflowMessenger = () => {
  return (
    <div>
      <df-messenger
        intent="WELCOME"
        chat-title="Triba-Chatbot-AI"
        agent-id="86d0281b-2715-46b2-958a-178bfd2b855d"
        language-code="vi"
      ></df-messenger>
    </div>
  );
};

export default DialogflowMessenger;
