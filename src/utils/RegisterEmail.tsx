import * as React from "react";
import { Body, Button, Container, Head, Heading, Html, Img, Link, Preview, Section, Tailwind, Text } from "@react-email/components";

type props = {
    username: string;
    VerifyLink: string;
    type?: string;
};
export default function RegisterEmail(props: props) {
    const { username, VerifyLink, type } = props;
    return (
        <Html lang="en">
            <Head />
            <Preview>{type == "VERIFY_USER" ? "Welcome to Waste-ease for Simplified your Waste Management" : "Lets recover your lost password"}</Preview>
            <Tailwind>
                <Html lang="en">
                    <Head>
                        <title>{type == "VERIFY_USER" ? "Welcome to ADTU WASTE DUMP " : "Lets recover your lost password"}</title>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                        <meta name="x-apple-disable-message-reformatting" />
                        <meta name="format-detection" content="telephone=no" />
                        <meta name="format-detection" content="date=no" />
                        <meta name="format-detection" content="address=no" />
                        <meta name="format-detection" content="email=no" />
                    </Head>
                    <Body className=" bg-white text-black my-auto mx-auto font-sans">
                        <Container className="border border-solid  border-black/50 rounded my-[40px] mx-auto p-[20px] w-[465px]">
                            <Section className="mt-[32px]">
                                <Img src={"https://cdn.discordapp.com/attachments/1079039236302446705/1225206462054268938/wastelogo.png?ex=6620496f&is=660dd46f&hm=1a2848f6d8726100d22c2fe9431afee90fd9f621e310f65fc7e61266a2dfb109&"} width="100" height="100" alt="Waste Ease Logo" className="my-0 mx-auto" />
                            </Section>
                            <Heading className="  text-[24px] font-normal text-center p-0 my-[30px] mx-0">{type == "VERIFY_USER" ? `Welcome to AnimeTrix` : "Password Recovery"}</Heading>
                            <Text className=" text-black text-[14px] leading-[24px]">
                                Dear <strong>{username}</strong>,
                            </Text>
                            <Text className=" text-[14px] leading-[24px]">{type == "VERIFY_USER" ? "Welcome to Waste-ease, where we're revolutionizing waste management by making it fun and rewarding! We're excited to have you join our platform and become part of our waste-fighting community. \n" : "We hope this email finds you in good spirits! It seems like your password needs a little TLC, so we’ve set up a magic button just for you"}</Text>
                            <Text className="  text-[14px] leading-[24px]">{type == "VERIFY_USER" ? " But first things first - let's get you verified so you can start earning those rewards! Click the button below to verify your email and unlock your access to our gamified waste management platform:" : "Remember, this link is as secret as the recipe for grandma’s famous cookies, so please guard it like a dragon guards its treasure! 🐉🔐 We trust you to keep it under wraps and not share it with anyone, not even your cat (unless your cat happens to be a cybersecurity expert, in which case, we might reconsider). Please click on the button below to reset your password:"}</Text>
                            <Section className="text-center mt-[32px] mb-[32px]">
                                <Button className=" bg-green-600 p-4 rounded text-white text-[12px] font-semibold w-full no-underline text-center" href={VerifyLink}>
                                    {type == "VERIFY_USER" ? "Verify Email" : "Reset Password"}
                                </Button>
                            </Section>
                            <Text className=" text-white text-[14px] leading-[24px]">
                                or copy and paste this URL into your browser:{" "}
                                <Link href={VerifyLink} className="text-green-600 no-underline">
                                    {VerifyLink}
                                </Link>
                            </Text>
                            <Text>Once you&apos;re in, get ready to embark on a waste-busting adventure like no other. Here&apos;s what you can expect:</Text>
                            <Text>
                                <strong className=" text-green-400">Dump & Earn Coupons </strong> : Every time you dump waste responsibly, you&apos;ll earn coupons that you can redeem for exciting rewards. It&apos;s like leveling up in a game, but with real-world benefits!
                            </Text>
                            <Text>
                                <strong className=" text-green-600">Compete with Friends:</strong>Challenge your friends and family to see who can dump the most waste and earn the most rewards. Let&apos;s turn waste management into a friendly competition!
                            </Text>
                            <Text>
                                <strong className=" text-green-600">Exclusive Rewards</strong>From discounts at local businesses to eco-friendly goodies, our rewards catalog is filled with perks that make waste management worth your while.
                            </Text>
                            <Text>
                                <strong className=" text-green-600">Track Your Progress:</strong> Keep an eye on your waste-dumping stats and see how you&apos;re making a difference in the world. You&apos;ll be amazed at how much of an impact you can have!
                            </Text>
                            <Text>At Waste-ease, we believe that saving the planet should be fun and rewarding. So let&apos;s roll up our sleeves, get dumping, and earn some coupons along the way!</Text>
                            <Text>Thanks for joining us on this exciting adventure. Together, we&apos;ll gamify waste management and make a difference, one dump at a time!</Text>
                            <Text>Best regards,</Text>
                            <Text>Team Mnemonics</Text>
                        </Container>
                    </Body>
                </Html>
            </Tailwind>
        </Html>
    );
}
