import { MultipartFile, MultipartValue } from '@fastify/multipart';

export const successResponse = (message: string, data?: any) => ({
  status: 'success',
  message,
  data,
});

export const errorResponse = (message: string, error?: any) => ({
  status: 'error',
  message,
  error,
});

export function isFilePart(
  part: MultipartFile | MultipartValue<unknown>,
): part is MultipartFile {
  return (part as MultipartFile).filename !== undefined;
}
