'use client';
import { Button, Card, Divider, Input, Modal, Typography, Tabs } from 'antd';
import { Segmented, ConfigProvider } from 'antd';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import React, { useState, useRef, useEffect } from 'react';
import { IoMailOutline } from 'react-icons/io5';

import { FaqCard } from '@/components/home/card/FaqCard';
import MultipleProfileSkeletons from '@/components/home/card/ProfileCardSkeleton';
import Donate from '@/components/ui/donation/Donate';
import ProcessingModal from '@/components/ui/donation/ProcessingModal';
import { useTeamMembers } from '@/hooks/data/useTeamMembers';
import Footer from '@/components/layout/Footer';

const { Text } = Typography;

const AboutUs = () => {
  const aboutUsRef = useRef(null);
  const leadershipRef = useRef(null);
  const expectationsRef = useRef(null);
  const outreachRef = useRef(null);
  const contactRef = useRef(null);

  const t = useTranslations('about_us');
  const ht = useTranslations('home_page');
  const payt = useTranslations('payments');
  const tprof = useTranslations('teacher_profile');

  const sectionRefs = React.useMemo(
    () => ({
      aboutUs: aboutUsRef,
      leadership: leadershipRef,
      expectations: expectationsRef,
      outreach: outreachRef,
      contact: contactRef,
    }),
    []
  );

  const [activeSection, setActiveSection] = useState(null);

  const [selectedLDValue, setSelectedLDValue] = useState(t('executive_team'));
  const [selectedWEValue, setSelectedWEValue] = useState(t('system'));
  const [selecteContactsValue, setSelectedConatctsValue] = useState(t('contact_us'));

  const [showProcessingModal, setShowProcessingModal] = useState(false);

  const [showDonatePop, setShowDonatePop] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { teamMembers, isMembersPending } = useTeamMembers();

  const [member, setMemberDetails] = useState({});

  const scrollToSection = (sectionRef) => {
    sectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
      inline: 'nearest',
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px 0px -50% 0px',
      }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, [sectionRefs]);

  useEffect(() => {
    if (showDonatePop) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }

    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [showDonatePop]);

  const showDonatePopupModal = () => {
    setShowDonatePop(true);
  };

  const showModal = (memberData) => {
    setMemberDetails(memberData);

    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const BiographyModal = () => {
    return (
      <>
        <Modal
          title={<div className="text-[14px] flex justify-center">{tprof('biography')}</div>}
          open={isModalOpen}
          width={{
            xs: '90%',
            sm: '80%',
            md: '70%',
            lg: '60%',
            xl: '70%',
            xxl: '50%',
          }}
          height={100}
          onCancel={handleCancel}
          okText={<span className="text-[10px] md:text-xs">{payt('close')}</span>}
          onOk={handleCancel}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <div className="block md:hidden">
            <div className="flex flex-col gap-4 w-full">
              <div className="flex gap-2">
                <div>
                  <Image
                    src="/about-us/team-placeholder.png"
                    width={100}
                    height={60}
                    alt="user_photo"
                    className="w-full max-w-[80px] sm:max-w-[150px] md:max-w-[180px] lg:max-w-[180px] object-cover rounded-xl"
                  />
                </div>
                <div className="flex flex-col items-start justify-end ml-2">
                  <Text className="font-bold text-[10px]">{member?.name}</Text>
                  <Text className="text-gray-500 text-[10px]">
                    {member?.teams?.[0]?.position || 'No position'}
                  </Text>
                  <Text className="text-[10px] font-semibold">{member?.email}</Text>
                </div>
              </div>
              <div className="w-full flex flex-col gap-1">
                <Text className="text-[10px] text-justify leading-loose">{member?.bio}</Text>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="flex gap-4 w-full p-8">
              <div className="flex gap-2">
                <div className="w-56">
                  <Image
                    src="/about-us/team-placeholder.png"
                    width={120}
                    height={120}
                    alt="user_photo"
                    className="w-full max-w-[80px]  sm:max-w-[150px] md:max-w-[180px] lg:max-w-[220px] object-cover rounded-xl"
                  />
                </div>
              </div>
              <div className="w-full flex flex-col gap-6 lg:ml-8">
                <div className="flex flex-col items-start justify-end">
                  <Text className="font-bold text-sm">{member?.name}</Text>
                  <Text className="text-gray-500 text-xs">
                    {member?.teams?.[0]?.position || 'No position'}
                  </Text>
                </div>
                <Text className="text-xs text-justify lg:leading-loose">{member?.bio}</Text>
                <div className="flex flex-col">
                  <Text className="text-xs font-semibold">{ht('email')}:</Text>
                  <Text className="text-xs ">{member?.email}</Text>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  };

  const renderLDView = (value) => {
    switch (value) {
      case t('executive_team'):
        return (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {isMembersPending ? (
              <MultipleProfileSkeletons />
            ) : (
              teamMembers?.map((member) => (
                <div key={member.id} className="flex flex-col gap-2 items-center w-full">
                  <Image
                    alt=""
                    src="/about-us/team-placeholder.png"
                    className="w-28 h-28 rounded-full object-cover"
                    width={80}
                    height={80}
                  />
                  <div className="text-xs flex flex-col items-center ml-2">
                    <Text className="font-bold">{member.name}</Text>
                    <Text className="font-bold text-gray-500">{member?.teams?.[0]?.position}</Text>
                    <Text
                      onClick={() => showModal(member)}
                      className="text-blue-700 underline cursor-pointer"
                    >
                      {t('full_bio')}
                    </Text>
                  </div>
                </div>
              ))
            )}
          </div>
        );
        break;

      default:
        break;
    }
  };

  const renderWEView = (value) => {
    switch (value) {
      case t('system'):
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold text-lg">{t('system')}</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">
                {t('system_description')}
              </Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image
                src="/about-us/laptop.png"
                width={300}
                height={300}
                alt="laptop picture"
                className="w-full sm:w-3/4 rounded-lg"
              />
            </div>
          </div>
        );
        break;
      case t('language'):
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold text-lg">{t('language')}</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">
                {t('language_description')}
              </Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image
                src="/about-us/language.png"
                width={300}
                height={300}
                alt="language picture"
                className="w-full sm:w-3/4 rounded-lg"
              />
            </div>
          </div>
        );
        break;
      case ht('for_teachers'):
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold text-lg">{ht('for_teachers')}</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">
                {t('for_teachers_description')}
              </Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image
                src="/about-us/for_teachers.png"
                width={300}
                height={300}
                alt="teachers picture"
                className="w-full sm:w-3/4 rounded-lg"
              />
            </div>
          </div>
        );
        break;

      case ht('for_students'):
        return (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 items-center gap-4">
            <Typography className="flex flex-col items-center text-justify">
              <Text className="font-bold text-lg">{ht('for_students')}</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose leading-6 lg:leading-8">
                {t('for_students_description')}
              </Text>
            </Typography>
            <div className="w-full flex items-center justify-center">
              <Image
                src="/about-us/for_students.png"
                width={300}
                height={300}
                alt="students picture"
                className="w-full sm:w-3/4 rounded-lg"
              />
            </div>
          </div>
        );
        break;

      default:
        break;
    }
  };

  const renderContactsView = (value) => {
    switch (value) {
      case t('contact_us'):
        return (
          <Card className="w-full bg-[#F2EFEF]">
            <div className="flex flex-col space-y-4">
              <Text
                id="contact"
                ref={sectionRefs.contact}
                className="font-black text-lg lg:text-2xl"
              >
                {t('contact_us')}
              </Text>
              <Text className="text-xs text-justify leading-loose">{t('inquiries')}</Text>
              <Button
                type="primary"
                onClick={() => (window.location.href = 'mailto:galaonlinehub@gmail.com')}
                className="text-xs bg-black w-full md:w-fit font-bold hover:!bg-gray-500 text-white"
                icon={<IoMailOutline size={16} />}
              >
                {t('mail_us')}
              </Button>
              <Divider
                orientation="right"
                className="!text-xs !text-gray-500"
                style={{ borderColor: '#dcdcdc' }}
              >
                {t('subscription')}
              </Divider>
              <Text className="font-black text-lg lg:text-2xl">{t('subscribe_to_emails')}</Text>
              <Text className="text-xs leading-loose text-justify">{t('subscribe_text_1')}</Text>
              <Text className="text-xs leading-loose text-justify">{t('subscribe_text_2')}</Text>
              <Text className="text-xs leading-loose text-justify">{t('subscribe_text_3')}</Text>
              <Text className="text-xs font-bold mt-3">{t('subscribe_to_emails')}</Text>
              <div className="flex flex-col md:flex-row gap-4 mb-5">
                <Input
                  type="email"
                  size="middle"
                  className="w-full md:w-1/4"
                  placeholder={ht('email')}
                />
                <Button type="primary" className="bg-black text-xs text-white hover:!bg-gray-500">
                  {t('subscription')}
                </Button>
              </div>
              <Divider
                orientation="right"
                style={{ borderColor: '#dcdcdc' }}
                className="!text-xs !text-gray-500"
              >
                {t('unsubscribe')}
              </Divider>
              <Text className="font-black text-lg lg:text-2xl">{t('unsubscribe_from_emails')}</Text>
              <Text className="text-xs leading-loose text-justify">{t('unsubscribe_text')}</Text>
              <Text className="text-xs font-bold mt-3">{t('unsubscribe_from_emails')}</Text>
              <div className="flex flex-col md:flex-row gap-4 mb-5">
                <Input
                  type="email"
                  size="middle"
                  className="w-full md:w-1/4"
                  placeholder={ht('email')}
                />
                <Button type="primary" className="bg-black text-xs text-white hover:!bg-gray-500">
                  {t('unsubscribe')}
                </Button>
              </div>
            </div>
          </Card>
        );
        break;
      case ht('faqs'):
        return (
          <div className="relative w-full ">
            <FaqCard
              faqQn={ht('what_is_gala_education')}
              bgColor={'#F2EFEF'}
              faqAns={ht('what_is_gala_education_description')}
            />
            <FaqCard
              faqQn={ht('is_there_money_back_guarantee')}
              bgColor={'#F2EFEF'}
              faqAns={ht('money_back_guarantee_description')}
            />
            <FaqCard
              faqQn={ht('who_can_use_gala_education')}
              bgColor={'#F2EFEF'}
              faqAns={ht('who_can_use_gala_education_description')}
            />
            <FaqCard
              faqQn={ht('do_i_need_device_for_tutoring')}
              bgColor={'#F2EFEF'}
              faqAns={ht('do_i_need_device_for_tutoring_description')}
            />
            <FaqCard
              faqQn={ht('do_i_need_to_be_registered_to_donate')}
              bgColor={'#F2EFEF'}
              faqAns={ht('do_i_need_to_be_registered_to_donate_description')}
            />
            <FaqCard
              faqQn={ht('how_are_donations_used')}
              bgColor={'#F2EFEF'}
              faqAns={ht('how_are_donations_used_description')}
            />
            <FaqCard
              faqQn={ht('what_makes_gala_education_different')}
              bgColor={'#F2EFEF'}
              faqAns={ht('what_makes_gala_education_different_description')}
            />
            <FaqCard
              faqQn={ht('how_do_short_courses_work')}
              faqAns={ht('how_do_short_courses_work_description')}
            />
            <FaqCard
              faqQn={ht('is_there_age_limit_for_short_courses')}
              bgColor={'#F2EFEF'}
              faqAns={ht('age_limit_for_short_courses_description')}
            />
            <FaqCard
              faqQn={ht('how_to_become_tutor')}
              bgColor={'#F2EFEF'}
              faqAns={ht('how_to_become_tutor_description')}
            />
            <FaqCard
              faqQn={ht('can_i_access_gala_outside_tanzania')}
              bgColor={'#F2EFEF'}
              faqAns={ht('can_i_access_gala_outside_tanzania_description')}
            />
          </div>
        );
        break;

      default:
        break;
    }
  };

  return (
    <div className=" w-full flex flex-col">
      <div className="flex flex-col justify-between -mt-10 md:-mt-16 px-6 py-8 md:px-12 lg:px-20 md:py-12 h-auto w-screen">
        <div className="flex flex-col w-full md:w-3/4 pt-6">
          <div className="flex flex-col">
            <Text id="aboutUs" ref={sectionRefs.aboutUs} className="font-black text-xl lg:text-2xl">
              {t('about_us')}
            </Text>
            <div className="flex flex-col">
              <Typography className="text-xs lg:text-sm text-justify !leading-loose">
                {t('about_us_description')}
              </Typography>
            </div>

            <div className="flex flex-col mt-6">
              <Text
                id="leadership"
                ref={sectionRefs.leadership}
                className="font-black text-lg lg:text-2xl py-2"
              >
                {t('leadership')}
              </Text>
              <div className="flex flex-col w-full py-3">
                <ConfigProvider
                  theme={{
                    components: {
                      Segmented: {
                        itemSelectedBg: '#030DFE',
                        itemSelectedColor: '#ffffff',
                      },
                    },
                  }}
                >
                  <Segmented
                    className="font-bold"
                    options={[
                      t('executive_team'),
                      t('advisory_board'),
                      t('board_of_directors'),
                      t('governance_docs'),
                    ]}
                    size="middle"
                    value={selectedLDValue}
                    onChange={setSelectedLDValue}
                    block
                  />
                </ConfigProvider>
              </div>
              <div className="md:p-3">{renderLDView(selectedLDValue)}</div>
            </div>

            <div className="flex flex-col mt-6">
              <Text
                id="expectations"
                ref={sectionRefs.expectations}
                className="font-black text-lg lg:text-2xl pt-2"
              >
                {t('what_to_expect')}
              </Text>
              <div className="flex flex-col w-full py-3">
                <ConfigProvider
                  theme={{
                    components: {
                      Segmented: {
                        itemSelectedBg: '#030DFE',
                        itemSelectedColor: '#ffffff',
                      },
                    },
                  }}
                >
                  <Segmented
                    className="font-bold"
                    options={[t('system'), t('language'), ht('for_teachers'), ht('for_students')]}
                    size="middle"
                    value={selectedWEValue}
                    onChange={setSelectedWEValue}
                    block
                  />
                </ConfigProvider>
              </div>
              <div className="md:p-6">{renderWEView(selectedWEValue)}</div>
            </div>

            <div className="flex flex-col mt-8">
              <Text
                id="outreach"
                ref={sectionRefs.outreach}
                className="font-black text-lg lg:text-2xl py-2"
              >
                {t('outreach_efforts')}
              </Text>
              <Text className="font-black text-sm">{t('making_a_difference')}</Text>
              <Text className="text-xs lg:text-sm xxs:leading-loose lg:leading-loose text-justify">
                {t('outreach_message')}
              </Text>
              <div className="w-full relative py-6">
                <Image
                  src="/about-us/outreach.png"
                  width={300}
                  height={300}
                  alt="outreach_image"
                  className="w-full"
                />
                <Text className="absolute left-6 bottom-10 text-xs md:text-sm font-bold text-white p-3 bg-[#0000004D]/30">
                  {t('serve_from_wherever')}
                </Text>
              </div>
              <Text className="text-xs lg:text-sm xxs:leading-loose lg:leading-loose text-justify">
                {t('donate_message')}
              </Text>
              <div className="w-full justify-center flex py-4 mb-10">
                <Button
                  onClick={showDonatePopupModal}
                  size="middle"
                  className="font-semibold w-64 bg-[#F2EFEF]"
                >
                  {ht('donate_now')}
                </Button>
              </div>
            </div>

            <div className="flex flex-col mb-8">
              <div className="flex flex-col w-full py-3">
                <ConfigProvider
                  theme={{
                    components: {
                      Segmented: {
                        itemSelectedBg: '#030DFE',
                        itemSelectedColor: '#ffffff',
                      },
                    },
                  }}
                >
                  <Segmented
                    className="font-bold"
                    options={[t('contact_us'), ht('faqs')]}
                    size="middle"
                    value={selecteContactsValue}
                    onChange={setSelectedConatctsValue}
                    block
                  />
                </ConfigProvider>
              </div>
              <div className="md:p-3 mt-4">{renderContactsView(selecteContactsValue)}</div>
            </div>
          </div>
          <div className="hidden md:flex fixed right-3 top-0 bottom-0 md:w-48 lg:w-56 items-center justify-center">
            <div className="flex flex-col items-center w-full space-y-4">
              <Text
                onClick={() => scrollToSection(sectionRefs.aboutUs)}
                className={`text-right  text-gray-400 w-full  p-2 cursor-pointer ${
                  activeSection === 'aboutUs'
                    ? 'text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('about_us')}
              </Text>
              <Text
                onClick={() => scrollToSection(sectionRefs.leadership)}
                className={`text-right  text-gray-400  w-full  p-2  cursor-pointer ${
                  activeSection === 'leadership'
                    ? 'text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('leadership')}
              </Text>
              <Text
                onClick={() => scrollToSection(sectionRefs.expectations)}
                className={`text-right  text-gray-400 w-full  p-2  cursor-pointer ${
                  activeSection === 'expectations'
                    ? 'text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('what_to_expect')}
              </Text>
              <Text
                onClick={() => scrollToSection(sectionRefs.outreach)}
                className={`text-right text-gray-400 w-full  p-2  cursor-pointer ${
                  activeSection === 'outreach'
                    ? 'text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('outreach_efforts')}
              </Text>
              <Text
                onClick={() => scrollToSection(sectionRefs.contact)}
                className={`text-right text-gray-400 w-full  p-2  cursor-pointer ${
                  activeSection === 'contact'
                    ? 'text-white font-bold border-r-4 rounded-r-md border-black bg-gradient-to-l from-gray-500 to-transparent px-4 py-2'
                    : 'hover:text-blue-700'
                }`}
              >
                {t('contact_us')}
              </Text>
            </div>
          </div>
        </div>

        {BiographyModal()}
        {showDonatePop && (
          <div className="fixed inset-0 bg-black bg-opacity-70 !z-[80] flex justify-center items-center">
            <div className="p-1 rounded-lg w-full items-center justify-center flex ">
              <Donate
                setShowDonatePopup={setShowDonatePop}
                showDonatePopup={showDonatePop}
                setShowProcessingModal={setShowProcessingModal}
              />
            </div>
          </div>
        )}

        <ProcessingModal
          setShowProcessingModal={setShowProcessingModal}
          showProcessingModal={showProcessingModal}
        />
      </div>
      <div className="w-full">
        <Footer/>
      </div>
    </div>
  );
};

export default AboutUs;
