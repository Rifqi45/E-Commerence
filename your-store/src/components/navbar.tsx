import Link from "next/link";
import MainNav from "@/components/main-nav";
import Container from "@/components/ui/container";
import getCategories from "@/actions/get-categories";
import NavbarActions from "@/components/navbar-action";
import getStore from "@/actions/get-store";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();
  const store = await getStore();
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sn:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 flex lg:ml-0 gap-x-2">
            <p className="font-bold text-xl">{store.name}</p>
          </Link>
          <MainNav data={categories}/>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
}

export default Navbar;
 