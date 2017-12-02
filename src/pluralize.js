export default (count, singular, plural = `${singular}s`) => (count === 1 ? singular : plural);
