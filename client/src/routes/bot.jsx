import { createFileRoute } from "@tanstack/react-router";
import Chat from "../bot";

export const Route = createFileRoute("/bot")({
  component: Chat,
});
