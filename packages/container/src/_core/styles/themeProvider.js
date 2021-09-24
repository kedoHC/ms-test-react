
import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme(
	/**
	 * @see https://material-ui.com/customization/themes/#theme-configuration-variables
	 */
	{
		// direction: "rtl",
		typography: {
			fontFamily: ["Inter"].join(","),
		},

		palette: {
			primary: {
				// light: will be calculated from palette.primary.main,
				main: "#4263eb",
				// dark: will be calculated from palette.primary.main,
				// contrastText: "#fff" //will be calculated to contrast with palette.primary.main
			},
			secondary: {
				// light: will be calculated from palette.primary.main,
				main: "#000000",
				// dark: will be calculated from palette.primary.main,
				contrastText: "#fff" //will be calculated to contrast with palette.primary.main
			},
			error: {
				light: "#D86068",
				main: "#f03e3e",
				// dark: will be calculated from palette.primary.main,
				// contrastText: "#fff" //will be calculated to contrast with palette.primary.main
			},
			gray: {
				main: "rgba(0, 0, 0, 0.5)",
				light: "rgba(0, 0, 0, 0.15)"
			}
		},
		overrides: {
			// MuiContainer:{
			//   maxWidthLg:{
			//     maxWidth: "1340px !important"
			//   }
			// },
			MuiTooltip: {
				tooltip: {
					fontSize: "0.825rem"
				}
			},
			MuiListItemIcon: {
				root: {
					minWidth: 30
				}
			},
			MuiMenu: {
				paper: {
					maxHeight: "200px"
				}
			},
			MuiButton: {
				root: {
					// general styles for Button
					fontFamily: "Inter",
					padding: "0.73rem 1rem",
					lineHeight: 1.125,
					textTransform: "none",

				},
				containedPrimary: {
					// general styles for Button type Primary
					"&:hover": {
						opacity: "0.8"
					}
				},
				containedSecondary: {
					// general styles for Button type Secondary
					"&:hover": {
						opacity: "0.8"
					}
				},
				sizeSmall: {
					// fontSize: "1rem",
					fontSize: "0.875rem",
					padding: "0.7rem 1rem",
				},
				outlined: {
					padding: "1rem 2rem"
				},
				outlinedSecondary: {
					border: "1px solid rgba(0, 0, 0, 0.15)",
					boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)"
				},
				startIcon: {
					marginRight: 0
				}
			},
			MuiInputBase: {
				// general styles for input
				root: {
					'&$focused': {
					},
				},
			},
			MuiOutlinedInput: {
				root: {
					borderRadius: "6px",
					// padding: "15.5px 14px"
					// backgroundColor: "green"
					boxShadow: "0px 2px 4px 0px rgba(0, 0, 0, 0.1)",

				},
				input: {
					padding: "10.5px 14px",
					// border: "1px solid rgba(0, 0, 0, 0.15)",

				}
			},
			MuiInputLabel: {
				// color: "red"
				root: {

				},
				outlined: {
					transform: "translate(14px, 12px) scale(1)",
				},
				shrink: {
					transform: "translate(14px, -7px) scale(0.75)",
					fontWeight: 500
				}
			},
			MuiFormLabel: {
				root: {
					fontFamily: "Inter",
				},
			},
			MuiFormControl: {
				root: {
					// marginBottom: "1rem"
				}
			},
			MuiTextField: {
				root: {
					// marginBottom: "1rem"
				}
			},
			MuiTextFieldLabel: {
				root: {
					// marginBottom: "1rem"
				}
			},
			MuiList: {
				root: {
					// backgroundColor: "red"
				}
			},
			MuiSelect: {
				root: {
					// backgroundColor: "red"
				},
				icon: {
					color: "#E0E0E0"
				}
			},
			MuiTableCell: {
				root: {
					padding: "1rem 0"
				},
				head: {
					fontWeight: 600,
					fontSize: "1rem"
				}
			},
			MuiDataGrid: {
				root: {
					fontFamily: ["Inter"].join(","),
					boder: 'none'
				}
			},
			MuiStepper: {
				root: {
					padding: "16px 0",
				}
			},
			MuiStepLabel: {
				root: {
					color: "rgb(39 37 37 / 33%)"
				},
				label: {
					color: "rgb(39 37 37 / 33%)"
				},
				iconContainer: {
					paddingRight: "16px",
				},
				completed: {
					color: "rgb(39 37 37 / 33%)!important"
				},
			},
			MuiStepContent: {
				root: {
					paddingLeft: "32px",
					borderLeft: "0"
				}
			},
			MuiStepIcon: {
				root: {
					width: "30px",
					height: '30px',
					color: "rgb(39 37 37 / 23%)"
				},
				completed: {
					color: "rgb(39 37 37 / 23%)!important"
				},
			}
		},
		props: {
			// Name of the component ⚛️
			MuiButtonBase: {
				// The properties to apply
				disableRipple: true // No more ripple, on the whole application 💣!
			},

			// Set default elevation to 1 for popovers.
			MuiPopover: {
				elevation: 1
			},

			MuiTypography: {
				variantMapping: {
					h1: 'h1', // spectral 3rem 
					h2: 'h2',
					h3: 'h3', //
					h4: 'h4',
					h5: 'h5',
					h6: 'h6',
					subtitle1: 'h2', //hero
					subtitle2: 'h2',  //Villian
					body1: 'p',
					body2: 'span',
				},
			},

		}
	}
);

theme.typography.h1 = {
	fontSize: '3rem',
	fontFamily: "Crimson Pro",
	fontWeight: "bold",
	letterSpacing: "-0.66px",
	lineHeight: 1.4,
	// '@media (max-width:600px)': {
	//   // fontSize: '4rem',
	// },
	// [theme.breakpoints.up('md')]: {
	//   // fontSize: '2.4rem',
	// },
};
theme.typography.h2 = {
	fontSize: '2.5rem',
	fontFamily: "Crimson Pro",
	fontWeight: "bold",
	letterSpacing: "-0.66px",
	lineHeight: 1.125,
};
theme.typography.h3 = {
	fontSize: '2rem',
	fontFamily: "Inter",
	fontWeight: 600,
	letterSpacing: "0.33px",
	lineHeight: 1.25,
};
theme.typography.h4 = {
	fontSize: '1.5rem',
	fontFamily: "Inter",
	fontWeight: 500,
	letterSpacing: "0.33px",
	lineHeight: 1.5,
};
theme.typography.h5 = {
	fontSize: '1.25rem',
	fontFamily: "Inter",
	fontWeight: 500,
	lineHeight: 1.5,
};
theme.typography.h6 = {
	fontSize: '1rem',
	fontFamily: "Inter",
	fontWeight: 400,
	lineHeight: 1.5,
	"&>:hover": {
		color: "red"
	}
};
theme.typography.body1 = {
	fontSize: '1rem',
	fontFamily: "Inter",
	fontWeight: 400,
	lineHeight: 1.5,
};
theme.typography.body2 = {
	display: 'block',
	fontSize: '.875rem',
	fontFamily: "Inter",
	fontWeight: 400,
	lineHeight: 1.5,
};
theme.typography.subtitle1 = {
	fontSize: '4rem',
	fontFamily: "Crimson Pro",
	fontWeight: 700,
	letterSpacing: "-0.66px",
	lineHeight: 1,
};
theme.typography.subtitle2 = {
	fontSize: '3.5rem',
	fontFamily: "Crimson Pro",
	fontWeight: 700,
	letterSpacing: "-0.66px",
	lineHeight: 1,
};