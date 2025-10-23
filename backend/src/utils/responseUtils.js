export function successResponse(data, message = "Success") {
  return { success: true, message, data };
}

export function errorResponse(message = "Error", code = 400) {
  return { success: false, message, code };
}
