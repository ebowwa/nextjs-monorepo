// pages/api/openapi.js
import openApiSpec from '../../api/openapi.mjs';

export default function handler(req, res) {
  res.status(200).json(openApiSpec);
}
