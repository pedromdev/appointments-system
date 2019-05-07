const LogoStyles = theme => ({
  logo: {
    fontFamily: theme.typography.fontFamily,
    fontSize: 26,
    fontWeight: 900,
    marginTop: 0,
    marginBottom: 0,
  },
  appText: {
    color: theme.palette.primary.main
  },
  ointmentsText: {
    color: 'black'
  },
  bwAppText: {
    color: 'black'
  },
  inverseOintmentsText: {
    color: 'white'
  }
});

export default LogoStyles;