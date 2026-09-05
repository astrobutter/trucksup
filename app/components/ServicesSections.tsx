import Reveal from "./Reveal";
import ServicePanel from "./ServicePanel";
import ServiceCard from "./ServiceCard";
import styles from "./ServicesSections.module.scss";

export function ServicesIntro() {
  return (
    <Reveal className={`container ${styles.intro}`} from="up">
      <h2 className="sectionLabel">Everything Your Fleet Needs, Together</h2>
      <p className="sectionSub">
        Trucksup Max is the only platform that combines fuel management, toll automation, vehicle
        tracking, load board, insurance and route calculation into one dashboard.
      </p>
    </Reveal>
  );
}

export function TuKawachSection() {
  return (
    <ServicePanel title="TU Kawach" columns={4}>
      <ServiceCard
        image="/images/kawach-vehicle-tracking.svg"
        alt="Map interface showing a live vehicle location with speed, ETA, and distance readouts"
        title="Vehicle Tracking"
        description="Track your fleet in real time with live location, trip visibility, and instant movement updates."
      />
      <ServiceCard
        image="/images/kawach-vehicle-verification.svg"
        alt="Delivery truck crossing a bridge with a verified stamp overlay"
        title="Vehicle Verification"
        description="Verify vehicle registration and ownership instantly before assigning or onboarding a vehicle."
      />
      <ServiceCard
        image="/images/kawach-dl-verification.svg"
        alt="Hand holding a driving license card with a verified stamp overlay"
        title="DL Verification"
        description="Instantly verify driver licenses, detect invalid or expired documents, and keep your fleet safe and compliant."
      />
      <ServiceCard
        image="/images/kawach-safety-360.svg"
        alt="Two trucks with a Safety 360 shield badge overlay"
        title="Safety 360"
        description="Instantly verify RC ownership with matching bank account and PAN details for hassle-free payment protection."
      />
    </ServicePanel>
  );
}

export function FastagSection() {
  return (
    <ServicePanel title="FASTag" columns={2}>
      <ServiceCard
        image="/images/fastag-idfc.svg"
        alt="Highway toll plaza booths with IDFC First Bank FASTag branding"
        title="IDFC FASTag"
        description="Toll payments through IDFC First Bank, with balance, transaction history, & downloadable statements in one place."
      />
      <ServiceCard
        image="/images/fastag-livquik.svg"
        alt="Highway toll plaza with LivQuik FASTag branding"
        title="LivQuik FASTag"
        description="Toll automation via LivQuik, with complete visibility into every transaction."
      />
    </ServicePanel>
  );
}

export function SmartFuelSection() {
  return (
    <ServicePanel title="Smart Fuel" columns={3}>
      <ServiceCard
        image="/images/fuel-iocl.svg"
        alt="IndianOil fuel station signage"
        title="IOCL Smart Fuel"
        description="Manage IndianOil fuel cards for your fleet, track balances and update card details without extra back-and-forth."
      />
      <ServiceCard
        image="/images/fuel-hpcl.svg"
        alt="HPCL fuel station signage"
        title="HPCL Smart Fuel"
        description="Monitor fuel spend at HPCL outlets across the country, with balances and statements available anytime."
      />
      <ServiceCard
        image="/images/fuel-jiobp.svg"
        alt="Jio-BP fuel station signage"
        title="Jio BP Smart Fuel"
        description="Keep track of balances & transaction history at Jio-BP outlets, with recharges and security settings tightly controlled."
      />
    </ServicePanel>
  );
}

export function LoadBoardSection() {
  return (
    <ServicePanel title="Load Board" columns={2}>
      <ServiceCard
        image="/images/loadboard-add-loads.svg"
        alt="Warehouse manager standing among stacked pallets, arms crossed"
        title="Add Loads"
        eyebrow="FINDING TRUCKS MADE EASY"
        description="Post your load requirements and connect with verified transporters across India."
      />
      <ServiceCard
        image="/images/loadboard-find-loads.svg"
        alt="Transporter standing in front of a row of loaded container trucks"
        title="Find Loads"
        eyebrow="ZERO EMPTY RUN"
        description="Discover verified return loads across India to maximise earnings and minimise empty miles."
      />
    </ServicePanel>
  );
}
