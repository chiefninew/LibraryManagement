import { Helmet } from "react-helmet-async";
import { useTheme } from "@mui/material/styles";
import { Container, Grid, Typography } from "@mui/material";
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from "./index";
import { useAuth } from "../../../hooks/useAuth";
import { getGreeting } from "../../../utils/greetings";

// ----------------------------------------------------------------------

export default function DashboardAppPage() {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <>
      <Helmet>
        <title> Library | Dashboard </title>
      </Helmet>

      <Container maxWidth="xl">
        <Typography variant="h4" sx={{mb: 2}}>
          Hi {user.name.split(' ')[0]}, Welcome back
        </Typography>
        <Typography variant="h6" sx={{mb: 5}}>
          {getGreeting()}
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Books" total={1000} icon={'ant-design:book-outlined'}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Authors" total={100} color="info" icon={'ant-design:user-outlined'}/>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Genres" total={1} color="warning" icon={'ant-design:file-outlined'} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppWidgetSummary title="Borrowals" total={1} color="error" icon={'ant-design:schedule-outlined'} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <AppWebsiteVisits
              title="Library Visits"
              subheader="(+43%) than last year"
              chartLabels={[
                '01/01/2003',
                '02/01/2003',
                '03/01/2003',
                '04/01/2003',
                '05/01/2003',
                '06/01/2003',
                '07/01/2003',
                '08/01/2003',
                '09/01/2003',
                '10/01/2003',
                '11/01/2003',
              ]}
              chartData={[
                {
                  name: 'Grade 1',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39],
                },
                {
                  name: 'Grade 2',
                  type: 'line',
                  fill: 'solid',
                  data: [20, 15, 26, 20, 35, 25, 54, 42, 49, 26, 29],
                },
                {
                  name: 'Grade 3',
                  type: 'line',
                  fill: 'solid',
                  data: [27, 12, 20, 27, 33, 23, 43, 32, 43, 22, 19],
                },
                {
                  name: 'Grade 4',
                  type: 'line',
                  fill: 'solid',
                  data: [17, 22, 16, 17, 26, 12, 33, 22, 29, 12, 11],
                },
                {
                  name: 'Grade 5',
                  type: 'line',
                  fill: 'solid',
                  data: [10, 8, 12, 10, 15, 8, 20, 15, 12, 8, 7],
                },
                {
                  name: 'Grade 6',
                  type: 'line',
                  fill: 'solid',
                  data: [5, 4, 6, 5, 8, 4, 10, 8, 6, 4, 3],
                },
                {
                  name: 'Grade 7',
                  type: 'line',
                  fill: 'solid',
                  data: [4, 3, 5, 4, 6, 3, 8, 6, 5, 3, 2],
                },
                {
                  name: 'Grade 8',
                  type: 'line',
                  fill: 'solid',
                  data: [3, 2, 4, 3, 5, 2, 6, 5, 4, 2, 1],
                },
                {
                  name: 'Grade 9',
                  type: 'line',
                  fill: 'solid',
                  data: [2, 1, 3, 2, 4, 1, 5, 4, 3, 1, 1],
                },
                {
                  name: 'Grade 10',
                  type: 'line',
                  fill: 'solid',
                  data: [1, 1, 2, 1, 3, 1, 4, 3, 2, 1, 1],
                },
                {
                  name: 'Grade 11',
                  type: 'line',
                  fill: 'solid',
                  data: [1, 0, 1, 1, 2, 0, 3, 2, 1, 0, 0],
                },
                {
                  name: 'Grade 12',
                  type: 'line',
                  fill: 'solid',
                  data: [0, 0, 1, 0, 1, 0, 2, 1, 1, 0, 0],
                },
              ]}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <AppCurrentVisits
              title="Borrowals"
              chartData={[
                { label: 'Fiction', value: 4344 },
                { label: 'Non-Fiction', value: 5435 },
                { label: 'Science', value: 1443 },
                { label: 'History', value: 4443 },
              ]}
              chartColors={[
                theme.palette.primary.main,
                theme.palette.info.main,
                theme.palette.warning.main,
                theme.palette.error.main,
              ]}
            />
          </Grid>

        </Grid>
      </Container>
    </>
  );
}
