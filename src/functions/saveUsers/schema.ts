export default {
  type: "object",
  properties: {
    nombre: { type: "string" },
    apellido: { type: "string" },
    edad: { type: "number" },
  },
  required: ["nombre", "apellido", "edad"],
} as const;
