const isDevelopment = process.env.NODE_ENV === 'development'

export default () => ({
  isDevelopment,
  isProduction: !isDevelopment,
  port: Number(process.env.PORT || 3000),
})
