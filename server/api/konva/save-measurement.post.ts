import { defineEventHandler, readBody } from 'h3';

interface Measurement {
  distance: number;
}

export default defineEventHandler(async (event) => {
  const body = await readBody(event) as Measurement;
  // TODO: change to toaster
  console.log('Saving measurement:', body.distance);

  return { status: 'success', distance: body.distance };
});