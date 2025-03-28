import { TextField, Button, Typography, Container } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

import { useAuthStore } from "../../store/auth";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Введите корректный email")
    .required("Email required"),
  password: yup
    .string()
    .min(8, "Пароль должен быть не менее 8 символов")
    .required("password required"),
});

export const SignIn = (): JSX.Element => {
  const { t } = useTranslation();
  const { getAuthLoading, signIn } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      email: "dfg@f.rg",
      password: "sfddfgdfg",
    },
    validationSchema,
    onSubmit: (values) => {
      signIn(values);
    },
  });

  return (
    <Container maxWidth="xs">
      <form onSubmit={formik.handleSubmit}>
        <TextField
          name="email"
          label={t("label.email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          variant="standard"
        />

        <TextField
          name="password"
          label={t("label.password")}
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          variant="standard"
          sx={{ mt: 3 }}
        />

        <Typography sx={{ mt: 2 }} variant="subtitle2" gutterBottom>
          {t("description.signIn")}
        </Typography>

        <Button
          disabled={getAuthLoading()}
          fullWidth
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mt: 3, width: 100 }}
        >
          {t("btnText.signIn")}
        </Button>
      </form>
    </Container>
  );
};
