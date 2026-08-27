
import { NativeTabs } from 'expo-router/unstable-native-tabs';

export default function AppTabs() {
  const colors = {
    background: '#ffffff',
    backgroundElement: '#eeeee',
    text: '#222222',
  };

  return (
    <NativeTabs
      backgroundColor={colors.background}
      indicatorColor={colors.backgroundElement}
      labelStyle={{
        selected: {
          color: colors.text,
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon src={require('@assets/images/tabIcons/home/NativeTabs.Trigger.label')} />
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="explore">
        <NativeTabs.Trigger.Icon src={require('@assets/images/tabIcons/explore.png')} />
        <NativeTabs.Trigger.Label>Scopri</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      {/*
        La tab dell'admin è nascosta ai clienti ma puoi raggiungerla
        digitando /admin direttamente nella barra degli indirizzi del browser.
       
        <NativeTabs.Trigger name="admin">
          <NativeTabs.Trigger.Icon src={require('@assets/images/tabIcons/Admin/NativeTabs.Trigger.label')} />
          <NativeTabs.Trigger.Label>Admin</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      */}

    </NativeTabs>
  );
}
 
