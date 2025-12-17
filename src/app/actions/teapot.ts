"use server"

export async function teapot() {
  throw new Response("I'm a teapot", { status: 418 })
}
