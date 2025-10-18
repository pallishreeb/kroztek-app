export const submitToSheetKroztek = async (formData: Record<string, string>) => {
  const WEBAPP_URL = "https://script.google.com/macros/s/AKfycbwNEGJ-_BhoTN0bx4VctDmyPK-L5ASOIfiR4kTDg55rccdKWy4Y6cHQPIOhd6VnWN6OiA/exec"; // replace
   // replace with the same secret set in script props

  // attach secret (if used)
  const payload = { ...formData };

  try {
    await fetch(WEBAPP_URL, {
      method: "POST",
      mode: "no-cors", // use no-cors to avoid CORS errors with Apps Script; response will be opaque.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // Because of no-cors, we cannot reliably read response; assume success if fetch doesn't throw.
    return { success: true };
  } catch (error) {
    console.error("submitToSheet error:", error);
    return { success: false, error };
  }
};
