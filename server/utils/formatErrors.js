export default (error) => {
  if (error.errors instanceof SequelizeValidationError) {
    console.log('SEQ ERROR');
  }
}