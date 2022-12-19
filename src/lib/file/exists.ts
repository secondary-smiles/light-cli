async function pathExists(pathname: string) {
  try {
    await Deno.stat(pathname);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    } else {
      throw error;
    }
  }
}

export { pathExists };
