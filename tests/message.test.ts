import { expect, it } from "vitest";
import { register, sendMessage } from "../src/notication";

it('tg message', async () => {
  register();
  const text = 'test1'
  const res = await sendMessage(text);
  expect(res.text).equal(text)
})