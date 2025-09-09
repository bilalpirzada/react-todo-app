import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";

 import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <Card className="h-[calc(100vh)] w-full max-w-[12rem] p-4  shadow-xl shadow-green-400 fixed top-0 left-0 rounded-[0px]">
      <div className="mb-2 p-4">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List className="">
        <ListItem className="p-1">
          <ListItemPrefix>
            ✅
          </ListItemPrefix>
          <Link to='/' className='cursor-pointer no-underline active:text-white visited:text-white'>Todo App</Link>
        </ListItem>
        <ListItem className="p-1">
          <ListItemPrefix>
            🔥
          </ListItemPrefix>
           <Link to='/contributions' className='cursor-pointer no-underline active:text-white visited:text-white'>Streaks</Link>
        </ListItem>
      </List>
    </Card>
  );
}