import Orbits from "./Orbits.tsx";
export default function Salesforce() {
  const badges = [
    {
      title: 'Administrator',
      src: './badges/administrator.png'
    },
    {
      title: 'platform developer1',
      src: './badges/developer1.png'
    },
    {
      title: 'platform developer2',
      src: './badges/developer2.png'
    },
    {
      title: 'javascript developer',
      src: './badges/javascript.png'
    },
  ]
  return (
    <>
      <span class="salesforce relative">
        Salesforce
        <Orbits items={badges}/>
      </span>
      
    </>
  
  )
}