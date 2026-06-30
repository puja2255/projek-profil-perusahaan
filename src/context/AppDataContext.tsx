import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";
import { api } from "../lib/api";
import { activities as mockActivities, companyProfile as mockCompanyProfile, orgMembers as mockOrgMembers, partners as mockPartners, products as mockProducts } from "../mockData";
import { Activity, CompanyProfile, OrgMember, Partner, Product } from "../types";

type AppDataContextValue = {
  companyProfile: CompanyProfile;
  products: Product[];
  activities: Activity[];
  partners: Partner[];
  orgMembers: OrgMember[];
  setProducts: (value: Product[]) => void;
  setActivities: (value: Activity[]) => void;
  setPartners: (value: Partner[]) => void;
  setOrgMembers: (value: OrgMember[]) => void;
  setCompanyProfile: (value: CompanyProfile) => void;
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({ children }: PropsWithChildren) {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile>(mockCompanyProfile);
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [activities, setActivities] = useState<Activity[]>(mockActivities);
  const [partners, setPartners] = useState<Partner[]>(mockPartners);
  const [orgMembers, setOrgMembers] = useState<OrgMember[]>(mockOrgMembers);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const [remoteProducts, remoteActivities, remotePartners, remoteMembers] = await Promise.all([
          api.getProducts(),
          api.getActivities(),
          api.getPartners(),
          api.getOrgMembers()
        ]);

        if (!mounted) {
          return;
        }

        if (remoteProducts.length) {
          setProducts(
            remoteProducts.map((item) => ({
              ...item,
              price: Number(item.price)
            }))
          );
        }
        if (remoteActivities.length) {
          setActivities(remoteActivities);
        }
        if (remotePartners.length) {
          setPartners(remotePartners);
        }
        if (remoteMembers.length) {
          setOrgMembers(remoteMembers);
        }
      } catch {
        if (!mounted) {
          return;
        }
        setCompanyProfile(mockCompanyProfile);
        setProducts(mockProducts);
        setActivities(mockActivities);
        setPartners(mockPartners);
        setOrgMembers(mockOrgMembers);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <AppDataContext.Provider
      value={{
        companyProfile,
        products,
        activities,
        partners,
        orgMembers,
        setProducts,
        setActivities,
        setPartners,
        setOrgMembers,
        setCompanyProfile
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  const value = useContext(AppDataContext);
  if (!value) {
    throw new Error("useAppData must be used within AppDataProvider");
  }
  return value;
}
